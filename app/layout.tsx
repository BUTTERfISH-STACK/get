import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Vellon AI — Premium AI Resume Platform",
    template: "%s | Vellon AI",
  },
  description:
    "Transform your career with elite AI-powered resume optimization, ATS scoring, professional redesigns, cover letters, and career coaching. Built for ambitious professionals who demand the best.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Vellon AI — The Premium AI Career Platform",
    description:
      "Optimize CVs for ATS, redesign with AI, generate cover letters, match jobs, and get elite career coaching. Trusted by top talent at FAANG & startups.",
    images: [{ url: "/og-image.png" }],
    siteName: "Vellon AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vellon AI",
    description: "Premium AI Resume & Career Intelligence Platform",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://vellon.ai"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-[#C5A46E] hover:bg-[#B38B4F] text-black font-semibold",
          card: "bg-zinc-950 border border-white/10 shadow-2xl",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased dark`}
      >
        <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white font-sans">
          {children}

          {/* Premium Toast Notifications */}
          <Toaster
            position="top-center"
            richColors
            closeButton
            className="font-sans"
            toastOptions={{
              style: {
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
