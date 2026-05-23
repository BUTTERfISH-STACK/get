// Core domain types for Vellon AI

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  bullets: string[]; // AI-optimized achievement bullets
  achievements?: string[];
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  honors?: string;
}

export interface Skill {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  category?: string;
}

export interface ParsedResume {
  personal: PersonalInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[] | string[];
  certifications?: string[];
  languages?: string[];
  projects?: Array<{ name: string; description: string; url?: string }>;
  achievements?: string[];
}

export type ResumeLayout = "ats" | "modern" | "executive" | "creative" | "premium";

export interface ResumeVersionData {
  id: string;
  resumeId: string;
  versionName: string;
  layoutType: ResumeLayout;
  content: ParsedResume;
  aiModel?: string;
  createdAt: string;
}

export interface ATSAnalysis {
  overallScore: number;
  keywordScore: number;
  readabilityScore: number;
  structureScore: number;
  formattingScore: number;
  keywordsFound: Record<string, number>;
  missingKeywords: string[];
  suggestions: Array<{
    type: "critical" | "important" | "enhancement";
    text: string;
    impact: number;
  }>;
  recruiterReadability?: number;
}

export interface JobMatchResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  keywordOverlap: number;
  aiAnalysis: {
    strengths: string[];
    gaps: string[];
    recommendations: string[];
    rewrittenBullets?: string[];
  };
  generatedCoverLetter?: string;
}

export type SubscriptionPlan = "FREE" | "PRO" | "ENTERPRISE";

export interface UserSubscription {
  plan: SubscriptionPlan;
  status: string;
  rewritesUsed: number;
  exportsUsed: number;
  aiChatsUsed: number;
  jobMatchesUsed: number;
  currentPeriodEnd?: string;
}

export interface AIRequest {
  task: string;
  model?: string;
  context?: any;
  stream?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  model?: string;
  createdAt: string;
}
