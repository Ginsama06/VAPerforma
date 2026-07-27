import Link from "next/link";
import BrandMark from "@/components/BrandMark";

export default function SiteFooter() {
  return (
    <footer className="bg-[#07111f] text-white">
      <div className="section-container grid gap-12 py-16 lg:grid-cols-[1.65fr_0.75fr]">
        <div>
          <Link
            href="/why-us"
            aria-label="Learn why clients choose VAPerforma"
            className="inline-flex items-center gap-3"
          >
            <BrandMark size="large" />
            <p className="font-black">VAPerforma</p>
          </Link>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
            Your trusted partner for professional virtual services. We
            provide Executive and Administrative Assistance, Medical Virtual
            Assistance, Social Media Management, Customer Support,
            Appointment Scheduling, Website Development, Video Editing,
            Legal Virtual Assistance, and Data Entry and Administrative
            Support—all in one place.
          </p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
            Company
          </p>

          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <Link href="/how-it-works" className="hover:text-white">
              How It Works
            </Link>
            <Link href="/why-us" className="hover:text-white">
              Why Us
            </Link>
            <Link href="/apply" className="hover:text-white">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-container py-6 text-xs text-slate-400">
          © 2026 VAPerforma. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
