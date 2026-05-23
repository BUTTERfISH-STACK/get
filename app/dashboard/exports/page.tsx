"use client";

import React from "react";
import Link from "next/link";
import { FileText, Download } from "lucide-react";

export default function ExportCenter() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-5xl font-semibold tracking-[-1.5px] mb-4">Export Center</h1>
      <p className="text-xl text-[#a1a1aa]">Download pixel-perfect, ATS-safe PDFs of your optimized resumes.</p>

      <div className="mt-12 card text-center py-16">
        <div className="mx-auto w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <Download className="w-7 h-7 text-[#C5A46E]" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-3">No exports yet</h2>
        <p className="text-[#a1a1aa] max-w-sm mx-auto mb-8">
          Once you optimize a resume and export it, your downloads will appear here with version history.
        </p>
        <Link 
          href="/dashboard/upload" 
          className="btn-gold px-8 py-3 rounded-2xl inline-flex items-center gap-2"
        >
          <FileText className="w-4 h-4" /> Go to Upload &amp; Optimize
        </Link>
      </div>

      <div className="text-xs text-[#71717a] mt-8 text-center">
        Exports are generated client-side using @react-pdf/renderer. Clean, professional, ATS-safe.
      </div>
    </div>
  );
}
