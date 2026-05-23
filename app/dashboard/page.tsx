"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Target, MessageSquare, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const stats = [
    { label: "Resumes", value: "7", change: "+2 this month" },
    { label: "Avg ATS Score", value: "87", change: "+14 since last" },
    { label: "AI Rewrites", value: "34", change: "12 this week" },
    { label: "Interviews Landed", value: "5", change: "via Vellon" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="text-[#C5A46E] text-sm tracking-[3px]">GOOD MORNING, PROFESSIONAL</div>
          <h1 className="text-5xl font-semibold tracking-[-1.5px] mt-1">Welcome back to Vellon.</h1>
        </div>
        <Link href="/dashboard" className="btn-gold px-7 py-3 rounded-2xl flex items-center gap-2 text-sm font-semibold">
          <Plus className="w-4 h-4" /> New Resume
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="card py-6 px-7">
            <div className="text-[#a1a1aa] text-xs tracking-widest">{stat.label}</div>
            <div className="text-5xl font-semibold tabular-nums tracking-[-1.5px] mt-2 mb-1">{stat.value}</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <div className="uppercase tracking-[2px] text-xs text-[#C5A46E] mb-4">QUICK START</div>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: Upload, label: "Upload & Optimize CV", desc: "PDF / DOCX → Elite version", href: "/dashboard/upload" },
            { icon: Target, label: "Match to a Job", desc: "Paste JD and tailor instantly", href: "/dashboard/jobs" },
            { icon: MessageSquare, label: "Talk to Vellon AI", desc: "Career coach, interview prep", href: "/dashboard/career" },
            { icon: FileText, label: "Generate New CV", desc: "From scratch with AI", href: "/dashboard/upload" },
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

      {/* Recent Resumes */}
      <div>
        <div className="flex justify-between mb-4 items-baseline">
          <div className="uppercase tracking-[2px] text-xs text-[#C5A46E]">YOUR CV LIBRARY</div>
          <Link href="/dashboard" className="text-xs text-[#C5A46E] hover:underline">View all →</Link>
        </div>

        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[#a1a1aa]">
                <th className="py-4 pl-8 font-normal">Resume</th>
                <th className="py-4 font-normal">Latest Score</th>
                <th className="py-4 font-normal">Versions</th>
                <th className="py-4 font-normal">Last Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {["Senior SWE at Vercel", "AI Research Role", "Product Manager Pivot", "Staff Engineer"].map((title, idx) => (
                <tr key={idx} className="resume-row border-b border-white/5 last:border-0">
                  <td className="pl-8 py-5 font-medium flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#C5A46E]" /> {title}
                  </td>
                  <td className="py-5">
                    <span className="inline-block px-3 py-px bg-emerald-500/10 text-emerald-400 rounded font-mono text-xs">{82 + idx * 3}</span>
                  </td>
                  <td className="py-5 text-[#a1a1aa]">{3 + idx} variants</td>
                  <td className="py-5 text-[#a1a1aa] text-xs">2 days ago</td>
                  <td className="pr-8 text-right">
                    <button className="text-xs px-4 py-1 rounded-full border border-white/20 hover:border-[#C5A46E] hover:text-[#C5A46E]">Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Suggestion Feed */}
      <div className="mt-12">
        <div className="uppercase tracking-[2px] text-xs text-[#C5A46E] mb-4">VELLON SUGGESTIONS FOR YOU</div>
        <div className="glass p-8 rounded-3xl text-sm text-[#a1a1aa] leading-relaxed">
          Your latest resume is strong on technical depth but could benefit from more quantified business impact in the first two roles. 
          Would you like me to rewrite those sections using the Executive template?
          <button className="ml-3 text-[#C5A46E] underline">Yes, rewrite now →</button>
        </div>
      </div>
    </div>
  );
}
