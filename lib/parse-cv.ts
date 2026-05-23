import mammoth from "mammoth";
import { extractText } from "unpdf"; // Reliable PDF text extraction for Vercel/Next.js
import { ParsedResume, PersonalInfo } from "@/types/resume";

/**
 * Production-grade CV text extractor
 * Supports: PDF, DOCX, TXT, MD
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    // unpdf is stable and works well in serverless environments
    const result = await extractText(new Uint8Array(buffer));
    const extractedText = Array.isArray(result.text) 
      ? result.text.join("\n") 
      : result.text;
    return extractedText;
  }

  if (ext === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  // Plain text / md / fallback
  return buffer.toString("utf-8");
}

// Very lightweight structured parser (in production this would be AI-powered via ollama)
export function parseResumeText(rawText: string): ParsedResume {
  const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);

  const personal: PersonalInfo = {
    fullName: lines[0] || "Professional",
    email: lines.find(l => l.includes("@")) || "you@email.com",
    phone: lines.find(l => /\d{3}/.test(l)) || "",
    location: lines.find(l => /San|New York|London|Remote/i.test(l)) || "",
    linkedin: lines.find(l => l.includes("linkedin")) || "",
  };

  const skills = lines
    .filter(l => l.length < 80 && (l.includes("•") || l.includes(",")))
    .flatMap(l => l.replace(/[•,]/g, "").split(/\s+/).filter(w => w.length > 2))
    .slice(0, 18);

  return {
    personal,
    summary: lines.slice(1, 5).join(" "),
    experience: [{
      company: "Previous Company",
      role: "Senior Role",
      startDate: "2021",
      endDate: "Present",
      bullets: lines.slice(6, 12).filter(l => l.length > 15),
    }],
    education: [{
      institution: "University",
      degree: "B.S. Computer Science",
      startDate: "2015",
      endDate: "2019",
    }],
    skills: Array.from(new Set(skills)),
    certifications: [],
    languages: ["English"],
  };
}
