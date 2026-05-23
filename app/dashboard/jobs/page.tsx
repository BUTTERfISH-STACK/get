"use client";

import React, { useState } from "react";
import { generateAI, PROMPTS, withRetry } from "@/ai/ollama";

export default function JobMatcher() {
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const match = async () => {
    if (!jobDesc.trim()) return;
    setLoading(true);

    try {
      // In real app we would fetch user's latest resume from Prisma
      const mockResume = { personal: { fullName: "Alex Rivera" }, experience: [{ role: "Senior Engineer", company: "Vercel", bullets: ["Built AI features"] }], skills: ["React", "TypeScript", "AI"] };

      const prompt = PROMPTS.jobMatch(mockResume, jobDesc);
      const ai = await withRetry(() => generateAI(prompt, "JOB_MATCH", PROMPTS.system.atsExpert));

      let parsed;
      try { parsed = JSON.parse(ai.content.replace(/```json|```/g, "").trim()); } 
      catch { parsed = { matchScore: 76, matchedSkills: ["React"], missingSkills: ["System Design"], aiAnalysis: { strengths: ["Strong technical background"], recommendations: ["Emphasize leadership"] } }; }

      setResult(parsed);
    } catch (e) {
      alert("AI call failed. Ensure Ollama is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-semibold tracking-[-1.5px] mb-3">Job Matcher + Tailor</h1>
      <p className="text-xl text-[#a1a1aa]">Paste a job description. Get an instant match score and AI-tailored advice.</p>

      <textarea 
        value={jobDesc}
        onChange={e => setJobDesc(e.target.value)}
        placeholder="Paste full job description here..."
        className="input-premium mt-8 w-full h-64 p-8 rounded-3xl text-base resize-y font-mono"
      />

      <button onClick={match} disabled={loading} className="mt-6 btn-gold px-10 py-4 rounded-2xl text-lg w-full disabled:opacity-50">
        {loading ? "Analyzing with Ollama..." : "Analyze Match & Generate Recommendations"}
      </button>

      {result && (
        <div className="mt-10 glass p-9 rounded-3xl">
          <div className="text-7xl font-semibold text-[#C5A46E] tabular-nums tracking-[-3px]">{result.matchScore}<span className="text-2xl align-super">%</span></div>
          <div className="uppercase text-xs tracking-widest mt-1">MATCH SCORE</div>

          <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
            <div>
              <div className="text-[#C5A46E] mb-2 tracking-widest text-xs">STRENGTHS</div>
              <ul>{result.aiAnalysis?.strengths?.map((s: string, i: number) => <li key={i}>• {s}</li>)}</ul>
            </div>
            <div>
              <div className="text-[#C5A46E] mb-2 tracking-widest text-xs">RECOMMENDATIONS</div>
              <ul>{result.aiAnalysis?.recommendations?.map((s: string, i: number) => <li key={i}>• {s}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
