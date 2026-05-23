"use client";

import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFResumeTemplate } from "@/components/PDFResumeTemplate";
import { ParsedResume } from "@/types/resume";

const sampleResume: ParsedResume = {
  personal: {
    fullName: "Alex Rivera",
    email: "alex@rivera.dev",
    phone: "+1 (415) 555-0192",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexrivera",
  },
  summary: "Senior Software Engineer with 8 years building scalable AI infrastructure at leading tech companies.",
  experience: [{
    company: "Vercel",
    role: "Senior Software Engineer",
    startDate: "2021",
    endDate: "Present",
    bullets: [
      "Architected and shipped AI-powered deployment platform used by 40k+ developers",
      "Improved build times by 67% through intelligent caching and parallelization",
    ],
  }],
  education: [{ institution: "Stanford", degree: "M.S. Computer Science", startDate: "2016", endDate: "2018" }],
  skills: ["TypeScript", "React", "Go", "Kubernetes", "LLMs"],
};

export default function ExportCenter() {
  const [isPro] = useState(true); // In real app pull from subscription

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-5xl font-semibold tracking-[-1.5px] mb-4">Export Center</h1>
      <p className="text-xl text-[#a1a1aa]">Download pixel-perfect, ATS-safe, recruiter-grade PDFs.</p>

      <div className="mt-12 card">
        <div className="font-semibold text-xl mb-2">Current Version — Executive Modern</div>
        <div className="text-sm text-[#a1a1aa]">ATS Score 94 • Generated 2 hours ago</div>

        <div className="mt-8 flex gap-4">
          <PDFDownloadLink
            document={<PDFResumeTemplate resume={sampleResume} isWatermarked={!isPro} />}
            fileName="Alex_Rivera_Executive.pdf"
          >
            {({ loading }) => (
              <button disabled={loading} className="btn-gold flex-1 py-4 rounded-2xl text-lg font-semibold">
                {loading ? "Generating PDF..." : "Download Clean PDF (Pro)"}
              </button>
            )}
          </PDFDownloadLink>

          <button 
            onClick={() => alert("In production this triggers Stripe upgrade flow.")}
            className="btn-ghost flex-1 py-4 rounded-2xl"
          >
            Upgrade for Watermark-Free
          </button>
        </div>
      </div>

      <div className="text-xs text-[#71717a] mt-8 text-center">
        Exports are generated client-side using @react-pdf/renderer for pixel-perfect output. No server roundtrips.
      </div>
    </div>
  );
}
