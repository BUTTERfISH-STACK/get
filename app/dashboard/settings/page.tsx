"use client";

import React from "react";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-5xl font-semibold tracking-[-1.5px] mb-10">Settings &amp; Preferences</h1>

      <div className="space-y-12">
        <div>
          <div className="uppercase tracking-[3px] text-xs mb-4 text-[#C5A46E]">CURRENT SESSION</div>
          <div className="glass p-8 rounded-3xl space-y-2 text-sm">
            <div>Mode: <span className="text-[#C5A46E]">Instant / No Account</span></div>
            <div>Data: <span className="text-[#a1a1aa]">Stored only in your browser (localStorage)</span></div>
            <div>AI: <span className="text-[#a1a1aa]">Connected to your private Ollama server</span></div>
          </div>
        </div>

        <div>
          <div className="uppercase tracking-[3px] text-xs mb-4 text-[#C5A46E]">PRO FEATURES (COMING SOON)</div>
          <div className="glass p-8 rounded-3xl text-sm text-[#a1a1aa]">
            Cloud sync across devices • Unlimited history • Team workspaces • Custom branding • Priority model access • Stripe billing
          </div>
        </div>

        <div className="text-xs text-[#71717a]">
          Everything you do here works immediately. Export your CVs to keep them forever. No login friction.
        </div>
      </div>
    </div>
  );
}
