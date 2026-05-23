import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignUpPage() {
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

        <h1 className="text-3xl font-semibold tracking-tight mb-4">Instant access. No signup.</h1>
        <p className="text-[#a1a1aa] text-lg mb-8">
          Everything works right now. Upload your CV, get elite AI analysis, export beautiful PDFs — no account required.
        </p>

        <Link 
          href="/dashboard" 
          className="btn-gold inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl text-lg"
        >
          Start Using Vellon <ArrowRight />
        </Link>

        <div className="mt-8 text-xs text-[#71717a]">
          Pro features &amp; cloud saving available soon.
        </div>
      </div>
    </div>
  );
}
