"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="max-w-2xl">
      <h1 className="text-5xl font-semibold tracking-[-1.5px] mb-10">Account &amp; Billing</h1>

      <div className="space-y-12">
        <div>
          <div className="uppercase tracking-[3px] text-xs mb-4 text-[#C5A46E]">PROFILE</div>
          <div className="glass p-8 rounded-3xl space-y-2 text-sm">
            <div>Name: <span className="text-[#a1a1aa]">{user?.fullName}</span></div>
            <div>Email: <span className="text-[#a1a1aa]">{user?.emailAddresses[0]?.emailAddress}</span></div>
            <div>Plan: <span className="text-[#C5A46E] font-semibold">PRO (14-day trial active)</span></div>
          </div>
        </div>

        <div>
          <div className="uppercase tracking-[3px] text-xs mb-4 text-[#C5A46E]">BILLING</div>
          <div className="glass p-8 rounded-3xl">
            <div className="text-xl font-semibold mb-1">Pro Plan — $19/mo</div>
            <div className="text-[#a1a1aa] text-sm">Next billing: July 6, 2026 • Manage via Stripe portal (production ready hook)</div>
            <button className="mt-6 text-xs border border-white/20 px-5 py-2 rounded-full hover:bg-white/5">Manage Subscription</button>
          </div>
        </div>

        <div className="text-xs text-[#71717a]">
          All data is stored securely. AI inference happens on your private Ollama instance. We never train on your data.
        </div>
      </div>
    </div>
  );
}
