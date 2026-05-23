/**
 * Vellon AI - Production Ollama Integration Layer
 * 
 * - Secure communication with self-hosted Ollama server
 * - Intelligent model routing based on task complexity
 * - Streaming support with proper error recovery
 * - Rate limiting + usage tracking hooks
 * - Advanced prompt engineering for recruiter-grade output
 */

import { env } from "@/lib/env";
import type { ResumeLayout } from "@/types/resume";

// TaskType from Prisma schema (we use string union for flexibility with new Prisma client)
type TaskType = string;

export type AIModel = "qwen2.5:7b" | "llama3.1:8b" | "deepseek-r1:7b" | "mistral" | "codellama:7b";

export interface OllamaMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OllamaStreamChunk {
  model: string;
  created_at: string;
  message?: { content: string; role: string };
  response?: string;
  done: boolean;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: { prompt_tokens?: number; completion_tokens?: number };
}

// Task to optimal model mapping (as per requirements)
const MODEL_ROUTER: Record<TaskType | string, AIModel> = {
  ATS_ANALYSIS: "qwen2.5:7b",      // Fast + excellent at structured extraction
  SKILL_EXTRACT: "qwen2.5:7b",
  CV_REWRITE: "llama3.1:8b",       // Strong reasoning + human-like rewrites
  CV_GENERATE: "llama3.1:8b",
  JOB_MATCH: "llama3.1:8b",
  COVER_LETTER: "llama3.1:8b",
  CAREER_COACH: "deepseek-r1:7b",  // Excellent for conversational coaching
  SUMMARY_GENERATE: "mistral",
  LINKEDIN_OPTIMIZE: "qwen2.5:7b",
  default: "qwen2.5:7b",
};

export function getOptimalModel(task: TaskType | string): AIModel {
  return MODEL_ROUTER[task] || MODEL_ROUTER.default;
}

// Core secure fetch wrapper to Ollama
async function ollamaFetch(endpoint: string, body: any, stream = false) {
  const url = `${env.OLLAMA_BASE_URL}/api/${endpoint}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000); // 2min timeout

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.OLLAMA_API_KEY}`, // Secure your Ollama server with this!
        "X-Vellon-Client": "production",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Ollama API error ${res.status}: ${errorText}`);
    }

    return res;
  } catch (err: any) {
    clearTimeout(timeout);
    if (err.name === "AbortError") throw new Error("Ollama request timed out");
    throw err;
  }
}

// Non-streaming completion (for structured JSON tasks)
export async function generateAI(
  prompt: string,
  task: TaskType | string = "default",
  systemPrompt?: string
): Promise<AIResponse> {
  const model = getOptimalModel(task);

  const messages: OllamaMessage[] = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content: prompt });

  const res = await ollamaFetch("chat", {
    model,
    messages,
    stream: false,
    options: { temperature: 0.3, top_p: 0.9 },
  });

  const data = await res.json();
  return {
    content: data.message?.content || "",
    model,
    usage: data.prompt_eval_count ? {
      prompt_tokens: data.prompt_eval_count,
      completion_tokens: data.eval_count,
    } : undefined,
  };
}

// Streaming chat / generation (for UI chat + long rewrites)
export async function* streamAI(
  prompt: string,
  task: TaskType | string = "default",
  systemPrompt?: string,
  onChunk?: (text: string) => void
): AsyncGenerator<string, AIResponse, void> {
  const model = getOptimalModel(task);

  const messages: OllamaMessage[] = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content: prompt });

  const res = await ollamaFetch("chat", {
    model,
    messages,
    stream: true,
    options: { temperature: 0.4, top_p: 0.92 },
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let fullContent = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter(Boolean);

      for (const line of lines) {
        try {
          const parsed: OllamaStreamChunk = JSON.parse(line);
          const delta = parsed.message?.content || parsed.response || "";
          if (delta) {
            fullContent += delta;
            onChunk?.(delta);
            yield delta;
          }
          if (parsed.done) {
            return {
              content: fullContent,
              model,
            };
          }
        } catch {
          // Ignore malformed chunks
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return { content: fullContent, model };
}

// ============== ADVANCED PROMPT ENGINEERING LIBRARY ==============
// Recruiter + ATS optimized prompts. Modular & context-aware.

export const PROMPTS = {
  system: {
    atsExpert: `You are a world-class ATS optimization specialist and senior technical recruiter with 15+ years experience at FAANG and top startups. 
You ONLY output clean, professional, measurable, keyword-rich content. Never use buzzwords without substance. 
Always quantify achievements. Format strictly as requested (JSON when specified).`,

    careerCoach: `You are an elite executive career coach who has helped 10,000+ professionals land dream roles at top companies.
Your advice is direct, actionable, empathetic but never soft. Use data, frameworks, and real examples.
Speak like a trusted advisor who has seen thousands of resumes and hiring decisions.`,

    rewriteSpecialist: `You are a master CV copywriter who transforms mediocre bullet points into compelling, results-driven statements that pass ATS and impress humans.
Use strong action verbs, metrics, and business impact. Keep language natural and confident. Never lie or exaggerate.`,
  },

  extractStructured: (text: string) => `
Extract the resume into clean structured JSON. Return ONLY valid JSON with this exact shape:
{
  "personal": { "fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "portfolio": "", "github": "" },
  "summary": "",
  "experience": [ { "company": "", "role": "", "startDate": "", "endDate": "", "current": false, "bullets": ["..."] } ],
  "education": [ { "institution": "", "degree": "", "field": "", "startDate": "", "endDate": "" } ],
  "skills": ["..."],
  "certifications": [],
  "languages": [],
  "projects": []
}

Resume text:
${text}
`,

  atsScore: (parsed: any, jobDesc?: string) => `
Analyze this resume for ATS compatibility and recruiter effectiveness.
Return strict JSON:
{
  "overallScore": 0-100,
  "keywordScore": 0-100,
  "readabilityScore": 0-100,
  "structureScore": 0-100,
  "formattingScore": 0-100,
  "keywordsFound": { "keyword": count },
  "missingKeywords": ["..."],
  "suggestions": [ { "type": "critical"|"important"|"enhancement", "text": "...", "impact": 1-10 } ],
  "recruiterReadability": 0-100
}

${jobDesc ? `Target Job Description: ${jobDesc}\n\n` : ""}
Resume JSON:
${JSON.stringify(parsed, null, 2)}
`,

  rewriteBullets: (bullets: string[], context: string) => `
Rewrite these experience bullets to be ATS-optimized and achievement-focused.
Make them start with powerful verbs, include metrics where possible, remove fluff.
Return as JSON array of strings.

Context: ${context}

Original bullets:
${bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}
`,

  generateCV: (userData: any, variant: ResumeLayout) => `
Generate a complete professional ${variant.toUpperCase()} style CV from the provided information.
Focus on impact, leadership, and results. Use modern but ATS-safe language.
Output the full structured JSON in the same format as extractStructured.

User data:
${JSON.stringify(userData)}
`,

  jobMatch: (resume: any, jobDesc: string) => `
You are an expert technical recruiter. Score how well this resume matches the job.
Return JSON:
{ "matchScore": 0-100, "matchedSkills": [], "missingSkills": [], "keywordOverlap": 0-1, "aiAnalysis": { "strengths": [], "gaps": [], "recommendations": [] } }

RESUME:
${JSON.stringify(resume)}

JOB DESCRIPTION:
${jobDesc}
`,

  coverLetter: (resume: any, job: { title: string; company: string; desc: string }) => `
Write a concise, personalized, high-converting cover letter (max 280 words).
Tone: confident, warm, specific to role. Reference 1-2 real achievements from the resume.
Do not use generic statements.

Candidate: ${resume.personal.fullName}
Role: ${job.title} at ${job.company}
Job highlights: ${job.desc.slice(0, 800)}

Resume summary + key achievements:
${resume.summary || ""}
${resume.experience?.[0]?.bullets?.slice(0, 3).join(" | ") || ""}
`,

  careerChat: (history: string, userMessage: string, resumeContext?: string) => `
You are Vellon, the user's personal elite career AI advisor.
Be concise, insightful, and action-oriented. Use the user's resume context when relevant.

${resumeContext ? `User's current resume context:\n${resumeContext}\n\n` : ""}

Conversation so far:
${history}

User: ${userMessage}

Respond helpfully:`,
};

// Retry wrapper with exponential backoff
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelay = 800
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, baseDelay * Math.pow(2, i)));
    }
  }
  throw new Error("Max retries exceeded");
}
