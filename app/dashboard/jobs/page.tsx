"use client";

import React, { useState } from "react";
import Link from "next/link";
import { generateAI, PROMPTS, withRetry } from "@/ai/ollama";

export default function JobMatcher() {
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const match = async () => {
    if (!jobDesc.trim()) return;
    setLoading(true);

    try {
      // For now we use a basic structure. In a full version this would come from the user's uploaded resume.
      const basicResume = {
        personal: { fullName: "Your Name" },
        experience: [{ role: "Your Current Role", company: "Your Company", bullets: [] }],
        skills: [],
      };

      const prompt = PROMPTS.jobMatch(basicResume, jobDesc);
      const ai = await withRetry(() => generateAI(prompt, "JOB_MATCH", PROMPTS.system.atsExpert));

      let parsed;
      try {
        parsed = JSON.parse(ai.content.replace(/```json|```/g, "").trim());
      } catch {
        parsed = {
          matchScore: 0,
          matchedSkills: [],
          missingSkills: [],
          aiAnalysis: {
            strengths: ["Please upload a real resume for accurate matching"],
            recommendations: ["Go to the Upload section first"],
          },
        };
      }

      setResult(parsed);
    } catch (e) {
      alert("AI call failed. Make sure your Ollama server is running and reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-semibold tracking-[-1.5px] mb-3">Job Matcher + Tailor</h1>
      <p className="text-xl text-[#a1a1aa]">Paste a job description. Get an instant match score and AI recommendations.</p>

      <div className="mt-4 text-sm text-[#a1a1aa]">
        For best results, first upload your resume in the <Link href="/dashboard/upload" className="text-[#C5A46E] underline">Upload section</Link>.
      </div>

      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Paste the full job description here..."
        className="input-premium mt-8 w-full h-64 p-8 rounded-3xl text-base resize-y font-mono"
      />

      <button
        onClick={match}
        disabled={loading || !jobDesc.trim()}
        className="mt-6 btn-gold px-10 py-4 rounded-2xl text-lg w-full disabled:opacity-50"
      >
        {loading ? "Analyzing with Ollama..." : "Analyze Job Match"}
      </button>

      {result && (
        <div className="mt-10 glass p-9 rounded-3xl">
          <div className="text-7xl font-semibold text-[#C5A46E] tabular-nums tracking-[-3px]">
            {result.matchScore}<span className="text-2xl align-super">%</span>
          </div>
          <div className="uppercase text-xs tracking-widest mt-1">MATCH SCORE</div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <div className="text-[#C5A46E] mb-2 tracking-widest text-xs">STRENGTHS</div>
              <ul className="space-y-1">
                {result.aiAnalysis?.strengths?.map((s: string, i: number) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[#C5A46E] mb-2 tracking-widest text-xs">RECOMMENDATIONS</div>
              <ul className="space-y-1">
                {result.aiAnalysis?.recommendations?.map((s: string, i: number) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
