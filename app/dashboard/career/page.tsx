"use client";

import React, { useState } from "react";
import { streamAI, PROMPTS } from "@/ai/ollama";
import { Send, Loader2 } from "lucide-react";

export default function AICareerCoach() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hello. I'm Vellon, your personal elite career advisor. How can I help you win today?" }
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMsg = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);

    // Add empty assistant message for streaming
    const assistantIdx = messages.length + 1;
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      let full = "";
      const system = PROMPTS.system.careerCoach;

      for await (const chunk of streamAI(input, "CAREER_COACH", system)) {
        full += chunk;
        setMessages(prev => {
          const copy = [...prev];
          copy[assistantIdx] = { role: "assistant", content: full };
          return copy;
        });
      }
    } catch (e: any) {
      const msg = e?.message || "Could not reach Ollama server.";
      setMessages(prev => [...prev, { role: "assistant", content: `Error: ${msg}\n\nPlease check that your OLLAMA_BASE_URL is set correctly and the server is reachable (no API key required if your Ollama is open).` }]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-8">
        <div className="text-[#C5A46E] tracking-[3px] text-sm">VELLON • CAREER INTELLIGENCE</div>
        <h1 className="text-4xl font-semibold tracking-tight">Talk to your personal career coach</h1>
      </div>

      <div className="flex-1 overflow-auto space-y-8 pr-4 text-[15px] leading-relaxed">
        {messages.map((m, idx) => (
          <div key={idx} className={m.role === "user" ? "text-right" : ""}>
            <div className={`inline-block max-w-[85%] p-5 rounded-3xl ${m.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}`}>
              {m.content || <Loader2 className="animate-spin w-4 h-4" />}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/10">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about interviews, salary, LinkedIn, career gaps..."
            className="input-premium flex-1 rounded-2xl px-6 py-4 text-lg"
            disabled={isStreaming}
          />
          <button 
            onClick={sendMessage} 
            disabled={!input.trim() || isStreaming}
            className="btn-gold px-8 rounded-2xl"
          >
            {isStreaming ? <Loader2 className="animate-spin" /> : <Send />}
          </button>
        </div>
        <div className="text-[10px] text-center text-[#71717a] mt-3">Streaming directly from your self-hosted Ollama • Private &amp; unlimited on Pro</div>
      </div>
    </div>
  );
}
