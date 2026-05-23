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

  // Webpack config for pdf-parse (node only) and mammoth compatibility
  webpack: (config, { isServer }) => {
    if (isServer) {
      // pdf-parse and mammoth are server-only
      config.externals = [...(config.externals || []), "canvas"];
    }
    return config;
  },

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
