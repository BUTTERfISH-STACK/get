import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C5A46E] to-[#A37F3D] flex items-center justify-center">
              <span className="font-bold text-black text-3xl tracking-[-2px]">V</span>
            </div>
            <span className="font-semibold tracking-[-0.6px] text-4xl">Vellon</span>
          </div>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight mb-4">No account needed</h1>
        <p className="text-[#a1a1aa] text-lg mb-8">
          Vellon works instantly. No login, no signup, no data stored on our servers unless you want Pro features later.
        </p>

        <Link 
          href="/dashboard" 
          className="btn-gold inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl text-lg"
        >
          Launch the App <ArrowRight />
        </Link>

        <div className="mt-8 text-xs text-[#71717a]">
          Want cloud sync + team features? Accounts coming soon.
        </div>
      </div>
    </div>
  );
}
