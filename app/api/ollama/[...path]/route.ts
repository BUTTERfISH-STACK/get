import { NextRequest } from "next/server";
import { env } from "@/lib/env";

/**
 * Ollama Proxy - Server-side only
 * 
 * This solves the "Failed to fetch" + CORS problem when using external Ollama from Vercel.
 * All AI calls now go through our own API route (server-to-server), so no CORS issues.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join("/");
  const targetUrl = `${env.OLLAMA_BASE_URL}/api/${pathStr}`;

  // Debug log - shows exactly what the server thinks OLLAMA_BASE_URL is
  console.log(`[Ollama Debug] Using OLLAMA_BASE_URL = ${env.OLLAMA_BASE_URL}`);

  if (!env.OLLAMA_BASE_URL) {
    return new Response(
      JSON.stringify({ 
        error: "OLLAMA_BASE_URL is not configured on the server. Please set it in your environment variables." 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.text();

    // Log for local debugging - shows it's hitting your local Ollama
    if (process.env.NODE_ENV === "development") {
      console.log(`[Ollama Proxy] Forwarding to: ${targetUrl}`);
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Forward API key only if present
    if (env.OLLAMA_API_KEY) {
      headers["Authorization"] = `Bearer ${env.OLLAMA_API_KEY}`;
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers,
      body,
    });

    // Stream support (important for chat streaming)
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error: any) {
    console.error("Ollama proxy error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reach Ollama server", details: error.message }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}

// GET handler (for some Ollama endpoints if needed)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join("/");
  const targetUrl = `${env.OLLAMA_BASE_URL}/api/${pathStr}`;

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to reach Ollama server" }),
      { status: 502 }
    );
  }
}
