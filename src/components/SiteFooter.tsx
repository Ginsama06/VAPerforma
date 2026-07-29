import BrandLogo from "@/components/BrandLogo";
import { socialLinks } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="bg-[#061f23] text-white">
      <div className="section-container grid gap-12 py-16 lg:grid-cols-[1.5fr_0.7fr_0.8fr]">
        <div>
          <a
            href="#home"
            className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2fc4c1]/30"
          >
            <BrandLogo size="footer" light />
          </a>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#bdd6d1]">
            Your trusted partner for professional virtual services across
            administration, healthcare support, customer service, social media,
            scheduling, website development, video editing, legal assistance,
            and data entry.
          </p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#7fa9a3]">
            Navigate
          </p>

          <nav
            aria-label="Footer navigation"
            className="mt-5 grid gap-3 text-sm text-[#bdd6d1]"
          >
            <a href="#home" className="transition hover:text-white">
              Home
            </a>
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How It Works
            </a>
            <a href="#why-us" className="transition hover:text-white">
              Why Us
            </a>
            <a href="#get-started" className="transition hover:text-white">
              Get Started
            </a>
          </nav>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#7fa9a3]">
            Social Media
          </p>

          <div className="mt-5 grid gap-3 text-sm text-[#bdd6d1]">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                {social.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-container flex flex-col gap-2 py-6 text-xs text-[#7fa9a3] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} VA Performa. All rights reserved.</span>
          <span>Professional virtual services for growing organizations.</span>
        </div>
      </div>
    </footer>
  );
}
