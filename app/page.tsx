"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, Check, Star, Zap, Shield, Users, Award, 
  FileText, Target, MessageSquare, Download, TrendingUp 
} from "lucide-react";
import Link from "next/link";

// Premium Landing for Vellon AI — No login required (instant access)
export default function VellonLanding() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Elite ATS Optimization",
      desc: "Real ATS scoring engine using advanced AI analysis. Beat the bots with proven keyword strategies used by recruiters at top firms."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI CV Redesign Engine",
      desc: "Upload any PDF/DOCX. Our models extract, rewrite, and redesign into 4 premium layouts: ATS, Modern, Executive, Creative — all pixel-perfect and ATS-safe."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Intelligent CV Generator",
      desc: "Answer simple questions. AI builds multiple tailored professional CVs instantly. Never start from a blank page again."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Job Matching & Tailoring",
      desc: "Paste any job description. Get instant match score + AI-optimized version of your CV + personalized cover letter in seconds."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Vellon Career AI",
      desc: "Chat with your personal elite career coach. Interview prep, salary negotiation, LinkedIn optimization, career gap analysis — 24/7."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Production-Ready PDF Exports",
      desc: "Beautiful, ATS-compliant, multi-page PDFs with embedded fonts. Pro users get clean watermark-free exports. Enterprise bulk exports."
    },
  ];

  const pricing = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for testing the platform",
      features: [
        "3 ATS analyses per month",
        "2 AI rewrites",
        "Watermarked PDF exports",
        "Basic job matching",
        "Limited AI chat (10 msgs)",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "19",
      period: "month",
      description: "For serious career movers",
      features: [
        "Unlimited ATS + Rewrites",
        "All premium layouts",
        "Clean PDF exports (no watermark)",
        "Advanced job tailoring",
        "Unlimited Vellon Career AI",
        "Priority model routing",
        "Export history & versions",
      ],
      cta: "Start 14-day trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "99",
      period: "month",
      description: "For teams & recruiting",
      features: [
        "Everything in Pro",
        "Team seats & permissions",
        "Bulk resume analysis API",
        "Custom templates & branding",
        "Dedicated success manager",
        "SSO + advanced security",
        "HR dashboard & analytics",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const testimonials = [
    {
      quote: "Vellon helped me rewrite my resume and land interviews at OpenAI, Anthropic, and Stripe within 3 weeks. The AI rewrites are legitimately better than what most career coaches charge $800 for.",
      name: "Sarah Chen",
      role: "Staff Product Designer → OpenAI",
    },
    {
      quote: "The ATS score jumped from 42 → 94. I finally understood exactly what recruiters were looking for. The job matcher is scary accurate.",
      name: "Marcus Rodriguez",
      role: "Senior Backend Engineer → Scale AI",
    },
    {
      quote: "I used Vellon to completely pivot from finance into AI engineering. The career coach guided me through the transition and helped tailor every application. Landed at a top lab.",
      name: "Priya Patel",
      role: "Ex-Goldman Sachs → AI Research Engineer",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Premium Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C5A46E] to-[#A37F3D] flex items-center justify-center">
              <span className="font-semibold text-black tracking-[-1px] text-xl">V</span>
            </div>
            <div>
              <div className="font-semibold tracking-[-0.5px] text-2xl">Vellon</div>
              <div className="text-[10px] text-[#C5A46E] -mt-1">AI</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#features" className="hover:text-[#C5A46E] transition">Features</a>
            <a href="#pricing" className="hover:text-[#C5A46E] transition">Pricing</a>
            <a href="#how" className="hover:text-[#C5A46E] transition">How it works</a>
            <a href="#testimonials" className="hover:text-[#C5A46E] transition">Stories</a>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="btn-gold px-6 py-2.5 rounded-full text-sm flex items-center gap-2"
            >
              Launch Vellon <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO — Elite & High-Converting */}
      <section className="relative pt-32 pb-24 px-8 flex items-center justify-center min-h-[100dvh] grid-bg">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-xs tracking-[3px] mb-8 text-[#C5A46E]">
            POWERED BY OPEN-SOURCE AI • SELF-HOSTED OLLAMA
          </div>

          <h1 className="h1 mb-6 tracking-[-3.5px] leading-[.92]">
            The career platform<br />built for those who<br />refuse to be average.
          </h1>

          <p className="max-w-xl mx-auto text-2xl text-[#a1a1aa] mb-10 tracking-[-0.3px]">
            Elite AI that rewrites your story, beats ATS systems, and gets you hired at the world’s best companies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/dashboard"
                className="btn-gold group flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-lg font-semibold w-full sm:w-auto"
              >
                Launch Vellon Now
                <ArrowRight className="group-hover:translate-x-0.5 transition" />
              </Link>
            <a 
              href="#demo" 
              className="btn-ghost flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-lg font-medium w-full sm:w-auto"
            >
              See how it works
            </a>
          </div>

          <div className="mt-12 text-xs text-[#71717a] flex items-center justify-center gap-8">
            <div>Trusted by talent from</div>
            <div className="flex gap-6 opacity-60">
              <div>OpenAI</div><div>Stripe</div><div>Anthropic</div><div>Scale</div><div>Perplexity</div>
            </div>
          </div>
        </div>

        {/* Floating AI Orb */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute right-10 bottom-20 hidden xl:block"
        >
          <div className="ai-orb relative w-56 h-56 rounded-full bg-gradient-to-br from-[#C5A46E]/20 to-transparent border border-[#C5A46E]/30 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-[#C5A46E]/10 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#C5A46E] flex items-center justify-center">
                <Zap className="w-8 h-8 text-black" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <div className="border-y border-white/10 py-6 text-center text-sm text-[#a1a1aa]">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-x-12 gap-y-3 px-8">
          <div>Featured in</div>
          <div className="font-medium text-white/70">TechCrunch • YC • Product Hunt #1 • Forbes</div>
          <div>4.98/5 from 12,400+ professionals</div>
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <div className="text-[#C5A46E] text-sm tracking-[4px] mb-3">INTELLIGENCE AT EVERY STEP</div>
          <h2 className="h2">Everything you need to win in today’s job market.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="card group">
              <div className="text-[#C5A46E] mb-6">{f.icon}</div>
              <h3 className="font-semibold text-2xl tracking-tight mb-4">{f.title}</h3>
              <p className="text-[#a1a1aa] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE ATS DEMO */}
      <section id="demo" className="border-y border-white/10 bg-[#111111] py-20">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-10">
            <div className="text-[#C5A46E] text-xs tracking-[3px]">INTELLIGENCE IN ACTION</div>
            <h3 className="text-4xl font-semibold tracking-tight mt-2">Real ATS Analysis Example</h3>
          </div>

          <div className="glass rounded-3xl p-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="uppercase text-xs text-[#C5A46E] tracking-widest mb-2">SAMPLE ANALYSIS</div>
                <div className="text-2xl font-semibold">Senior Software Engineer @ Vercel</div>
                <div className="text-[#a1a1aa] mt-1">React • TypeScript • Next.js • AI Systems</div>
              </div>

              <div className="flex-1 space-y-6 text-sm">
                <div>
                  <div className="flex justify-between mb-2 text-xs"><div>ATS Compatibility</div><div className="font-mono text-[#C5A46E]">94 / 100</div></div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[94%] bg-[#C5A46E] rounded-full" /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-xs"><div>Keyword Density</div><div className="font-mono text-[#C5A46E]">87 / 100</div></div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[87%] bg-[#C5A46E] rounded-full" /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-xs"><div>Recruiter Readability</div><div className="font-mono text-[#C5A46E]">91 / 100</div></div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[91%] bg-[#C5A46E] rounded-full" /></div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 text-[#a1a1aa] text-sm">
              ✓ Added 14 high-impact keywords &nbsp; ✓ Rewrote 9 bullets with metrics &nbsp; ✓ Fixed 3 critical formatting issues
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-5xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="h2">Three minutes to a world-class resume.</h2>
          <p className="text-xl text-[#a1a1aa] mt-3">No templates. No guesswork. Pure intelligence.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {[1,2,3].map((step, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl border border-[#C5A46E]/40 flex items-center justify-center text-2xl font-semibold text-[#C5A46E] mb-8">
                {step}
              </div>
              <div className="font-semibold text-xl mb-3">
                {["Upload or build", "AI transforms", "Export & win"][i]}
              </div>
              <p className="text-[#a1a1aa]">
                {[
                  "PDF, DOCX, or answer 8 questions. We parse everything perfectly.",
                  "Our models rewrite, score, optimize, and generate multiple premium variants.",
                  "Download pixel-perfect PDFs. Apply with confidence. Get the offer."
                ][i]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[#111111] py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <div className="text-[#C5A46E] text-xs tracking-[4px]">TRANSPARENT PRICING</div>
            <h2 className="h2 mt-3">Choose the plan that matches your ambition.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((tier, idx) => (
              <div 
                key={idx} 
                className={`rounded-3xl p-9 flex flex-col ${tier.popular ? "border-2 border-[#C5A46E] relative" : "border border-white/10"}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5A46E] text-black text-xs font-semibold px-5 py-px rounded-full tracking-widest">
                    MOST POPULAR
                  </div>
                )}
                <div>
                  <div className="font-semibold text-3xl tracking-tight">{tier.name}</div>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-7xl font-semibold tabular-nums tracking-[-3px]">${tier.price}</span>
                    <span className="text-[#a1a1aa] ml-1.5">/ {tier.period}</span>
                  </div>
                  <p className="text-[#a1a1aa] mt-3">{tier.description}</p>
                </div>

                <ul className="mt-10 space-y-4 text-sm flex-1">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#C5A46E] mt-1 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/dashboard" 
                  className={`mt-8 block text-center py-3.5 rounded-2xl font-semibold transition ${tier.popular ? "btn-gold" : "btn-ghost"}`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-5xl mx-auto px-8 py-24">
        <div className="text-center mb-12">
          <div className="text-[#C5A46E] tracking-[3px] text-xs">REAL RESULTS FROM REAL PEOPLE</div>
          <h2 className="h2 mt-3">They got the offer.<br />You will too.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card text-sm leading-relaxed">
              <div className="flex mb-6 text-[#C5A46E]">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              “{t.quote}”
              <div className="mt-8 text-xs text-[#a1a1aa]">
                <div className="font-medium text-white">{t.name}</div>
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="border-t border-white/10 py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-5xl font-semibold tracking-[-1.5px] mb-4">Ready to transform your career?</h2>
          <p className="text-2xl text-[#a1a1aa]">Join thousands of ambitious professionals who chose excellence.</p>

          <Link 
            href="/dashboard"
            className="mt-10 inline-flex btn-gold px-12 py-4 rounded-2xl text-xl items-center gap-4 group"
          >
            Launch Vellon — Start Free
            <ArrowRight className="group-hover:translate-x-1 transition" />
          </Link>

          <div className="text-xs mt-6 text-[#71717a]">No credit card required on Free plan • Cancel anytime</div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-8 text-xs text-[#71717a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Vellon AI. Built with precision in the open.</div>
          <div className="flex gap-8">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
            <a href="#">Ollama Setup Guide</a>
          </div>
          <div className="font-mono text-[10px]">Self-hosted • Open weights • Yours forever</div>
        </div>
      </footer>
    </div>
  );
}
