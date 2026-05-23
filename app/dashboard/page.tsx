"use client";

import React from "react";
import { Upload, Target, MessageSquare, FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="text-[#C5A46E] text-sm tracking-[3px]">WELCOME TO VELLON</div>
          <h1 className="text-5xl font-semibold tracking-[-1.5px] mt-1">Your AI Career Studio</h1>
        </div>
        <Link href="/dashboard/upload" className="btn-gold px-7 py-3 rounded-2xl flex items-center gap-2 text-sm font-semibold">
          <Plus className="w-4 h-4" /> Upload or Create Resume
        </Link>
      </div>

      {/* Empty State - No mock data */}
      <div className="card text-center py-16">
        <div className="mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-[#C5A46E]" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-3">Your workspace is ready</h2>
        <p className="text-[#a1a1aa] max-w-md mx-auto mb-8">
          Upload your first CV or generate a new one with AI. All your resumes, analyses, and exports will appear here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard/upload" className="btn-gold px-8 py-3 rounded-2xl inline-flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload CV
          </Link>
          <Link href="/dashboard/career" className="btn-ghost px-8 py-3 rounded-2xl inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Talk to Vellon AI
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <div className="uppercase tracking-[2px] text-xs text-[#C5A46E] mb-4">QUICK START</div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Upload, label: "Upload & Optimize CV", desc: "PDF / DOCX → Elite version", href: "/dashboard/upload" },
            { icon: Target, label: "Match to a Job", desc: "Paste JD and get AI tailoring", href: "/dashboard/jobs" },
            { icon: MessageSquare, label: "Talk to Vellon AI", desc: "Career coach & interview prep", href: "/dashboard/career" },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link 
                key={i}
                href={action.href}
                className="card text-left hover:border-[#C5A46E]/30 group transition flex flex-col"
              >
                <Icon className="w-6 h-6 mb-6 text-[#C5A46E] group-hover:scale-110 transition" />
                <div className="font-semibold text-lg tracking-tight mb-1">{action.label}</div>
                <div className="text-sm text-[#a1a1aa]">{action.desc}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
