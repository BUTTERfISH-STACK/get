import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations for Vellon AI on Vercel
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization - allow Clerk avatars + Supabase storage + public assets
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Experimental features for Next 16 + better perf
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-pdf/renderer",
      "sonner",
    ],
    serverActions: {
      bodySizeLimit: "10mb", // For CV file uploads
    },
  },

  // Turbopack configuration (Next.js 16 default)
  // We removed the custom webpack block because Turbopack does not support it.
  // pdf-parse + mammoth are only used on the server side (API routes / Server Actions)
  turbopack: {},

  // Headers for security + performance (production)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects for nice URLs
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
