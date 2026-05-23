import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-white/10 flex items-center px-8 justify-between glass-strong">
          <div className="flex items-center gap-3 text-sm">
            <div className="text-[#C5A46E] font-semibold">VELLON</div>
            <div className="text-[#71717a]">/ AI Career Studio</div>
          </div>
          <div className="text-xs text-[#a1a1aa]">
            Instant • Private • Powered by Ollama
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </div>
  );
}
