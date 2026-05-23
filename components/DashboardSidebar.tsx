"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, FileText, Target, MessageSquare, 
  Briefcase, Download, Settings, LogOut, Zap 
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/upload", label: "Upload & Optimize", icon: FileText },
  { href: "/dashboard/career", label: "AI Career Coach", icon: MessageSquare },
  { href: "/dashboard/jobs", label: "Job Matcher", icon: Target },
  { href: "/dashboard/exports", label: "Exports & PDFs", icon: Download },
  { href: "/dashboard/settings", label: "Settings & Billing", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 border-r border-white/10 bg-[#0a0a0a] flex flex-col">
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C5A46E] to-[#A37F3D] flex items-center justify-center">
            <span className="font-bold text-black text-lg tracking-[-1.5px]">V</span>
          </div>
          <div className="font-semibold text-2xl tracking-[-0.6px]">Vellon</div>
        </div>
        <div className="text-[10px] text-[#C5A46E] pl-11 -mt-0.5">INTELLIGENCE</div>
      </div>

      <div className="flex-1 p-3 space-y-1 text-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition ${active 
                ? "bg-white/5 text-white" 
                : "hover:bg-white/5 text-[#a1a1aa] hover:text-white"}`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-white/10 text-xs">
        <div className="flex items-center gap-2 text-[#C5A46E] mb-3">
          <Zap className="w-4 h-4" /> Powered by Ollama
        </div>
        
        <SignOutButton>
          <button className="flex w-full items-center gap-2 text-[#a1a1aa] hover:text-white py-2">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
