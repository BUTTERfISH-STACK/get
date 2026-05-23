import mammoth from "mammoth";
import { ParsedResume, PersonalInfo } from "@/types/resume";

/**
 * Production-grade CV text extractor
 * Supports: PDF, DOCX, TXT, MD
 * Uses dynamic import for pdf-parse to avoid Turbopack/webpack build issues
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    // Dynamic import avoids build-time resolution problems with pdf-parse
    const pdfParseModule: any = await import("pdf-parse");
    const pdfParse = pdfParseModule.default || pdfParseModule;
    const data = await pdfParse(buffer);
    return data.text;
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
