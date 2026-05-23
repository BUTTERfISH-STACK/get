import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
      <div className="w-full max-w-[420px]">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C5A46E] to-[#A37F3D] flex items-center justify-center">
              <span className="font-bold text-black text-3xl tracking-[-2px]">V</span>
            </div>
            <span className="font-semibold tracking-[-0.6px] text-4xl">Vellon</span>
          </div>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              card: "bg-zinc-950 border border-white/10 shadow-2xl",
              headerTitle: "text-white text-2xl",
              headerSubtitle: "text-[#a1a1aa]",
              formButtonPrimary: "bg-[#C5A46E] hover:bg-[#A37F3D] text-black font-semibold",
            },
          }}
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
        />
        
        <p className="text-center text-xs text-[#71717a] mt-8">
          Premium AI career platform • Self-hosted intelligence
        </p>
      </div>
    </div>
  );
}
