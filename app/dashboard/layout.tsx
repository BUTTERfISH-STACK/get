import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import DashboardSidebar from "@/components/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();

  // On-demand sync Clerk user → Prisma (production pattern)
  if (user) {
    await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email: user.emailAddresses[0]?.emailAddress ?? "",
        name: user.fullName ?? user.username ?? "",
        image: user.imageUrl,
      },
      create: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        name: user.fullName ?? user.username ?? "",
        image: user.imageUrl,
      },
    });
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-white/10 flex items-center px-8 justify-between glass-strong">
          <div className="flex items-center gap-3 text-sm">
            <div className="text-[#C5A46E] font-semibold">VELLON</div>
            <div className="text-[#71717a]">/ Dashboard</div>
          </div>
          <div className="text-xs text-[#a1a1aa]">
            {user?.fullName || "Professional"} • Pro Plan
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </div>
  );
}
