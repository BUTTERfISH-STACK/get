import { z } from "zod";

// Vellon AI - Centralized, validated environment variables
// Throws at build/start if required vars missing. Perfect for production.

const envSchema = z.object({
  // Clerk (optional now - auth is disabled for instant access)
  // Set these only if you want to re-enable login / Pro accounts later
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().optional(),
  CLERK_WEBHOOK_SECRET: z.string().optional(),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

  // Supabase Storage
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_STORAGE_BUCKET: z.string().default("resumes"),

  // Ollama AI
  // OLLAMA_API_KEY is optional — you can run a completely open Ollama without any key.
  OLLAMA_BASE_URL: z.string().url().default("http://localhost:11434"),
  OLLAMA_API_KEY: z.string().optional(),
  OLLAMA_MODEL_FAST: z.string().default("qwen2.5:7b"),
  OLLAMA_MODEL_DEEP: z.string().default("llama3.1:8b"),
  OLLAMA_MODEL_CHAT: z.string().default("deepseek-r1:7b"),

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_PRO: z.string().optional(),
  STRIPE_PRICE_ENTERPRISE: z.string().optional(),

  // Resend
  RESEND_API_KEY: z.string().optional(),

  // PostHog
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),

  // Feature limits
  MAX_FREE_REWRITES: z.coerce.number().default(5),
  MAX_FREE_EXPORTS: z.coerce.number().default(3),
  MAX_FREE_AI_CHATS: z.coerce.number().default(10),
  MAX_FREE_JOB_MATCHES: z.coerce.number().default(3),

  // Security
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(60),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
});

export const env = envSchema.parse(process.env);

// Type-safe access everywhere: import { env } from "@/lib/env"
export type Env = z.infer<typeof envSchema>;
