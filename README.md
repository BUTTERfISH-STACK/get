# Vellon AI — Production-Ready SaaS

**The premium, open-source-AI-powered career intelligence platform.**

Vellon helps ambitious professionals optimize resumes for ATS, redesign them into beautiful premium layouts, match jobs, generate cover letters, and receive elite AI career coaching — all powered by your private Ollama instance.

Built to rival (and beat) Resume.io, Rezi, Teal, and Kickresume with better UX, real open models, and true privacy.

---

## Stack (Production)

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind 4 + Framer Motion + Shadcn-style primitives
- **Auth**: Clerk (enterprise-ready)
- **Database**: Prisma + PostgreSQL (Supabase / Neon recommended)
- **Storage**: Supabase Storage (original CVs)
- **AI Brain**: Ollama (qwen2.5:7b, llama3.1, deepseek, mistral, codellama) — self-hosted
- **PDF**: @react-pdf/renderer (pixel-perfect, ATS-safe)
- **Payments**: Stripe (subscriptions + webhooks)
- **Email**: Resend
- **Analytics**: PostHog
- **Deployment**: Vercel (frontend) + Ubuntu/Docker (Ollama)

---

## Getting Started Locally (5 minutes)

1. **Clone & Install**
   ```bash
   git clone <your-repo>
   cd vellon-ai
   npm install
   ```

2. **Environment**
   ```bash
   cp .env .env.local
   # Fill in Clerk keys, Supabase, Ollama URL + key, Stripe, etc.
   ```

3. **Database**
   ```bash
   npx prisma db push          # or migrate dev
   ```

4. **Run**
   ```bash
   npm run dev
   ```

Visit http://localhost:3000 — beautiful landing + full dashboard ready.

**Important**: You must have a running Ollama server (see `OLLAMA_DEPLOY.md`).

---

## Production Deployment

### Vercel (Frontend)

1. Push to GitHub
2. Import on Vercel
3. Add all environment variables from `.env`
4. Deploy

### Ollama Server

Follow the complete guide in `OLLAMA_DEPLOY.md`

- Docker + GPU
- API key auth
- All 5 required models pre-pulled
- HTTPS reverse proxy

---

## Key Features Implemented (Fully Working)

- Stunning premium landing page (Linear/Vercel quality)
- Clerk authentication + user sync to Prisma
- Real PDF/DOCX/TXT parsing
- Real Ollama AI streaming (ATS scoring, career chat, job matching)
- Intelligent model routing
- ATS scoring with beautiful animated UI
- Professional @react-pdf/renderer exports (with watermark control)
- Full dashboard + sidebar + multiple flows
- AI Career Coach with real streaming responses
- Job matcher with live analysis
- Production Prisma schema (all tables, indexes, relations)
- Rate limiting ready + security headers

---

## Next (Easy to Extend)

- Full multi-version CV generator wizard
- Stripe checkout + webhooks
- Cover letter generator
- Resume versioning + history
- Enterprise team features

Everything is architected for scale and maintainability by senior engineers.

---

## License & Philosophy

Built for the ambitious. Private. Open weights. Yours.

---

Questions? Open an issue or reach out.

Vellon AI — 2026
