import BrandLogo from "@/components/BrandLogo";
import { socialLinks } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="bg-[#061f23] text-white">
      <div className="section-container grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.65fr_1fr_0.75fr]">
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
            Contact
          </p>

          <div className="mt-5">
            <p className="text-sm leading-6 text-[#9fbdb8]">
              Business inquiries
            </p>

            <a
              href="mailto:bspartners.vaperforma@gmail.com"
              className="mt-2 block break-all text-sm font-semibold leading-6 text-[#dce45a] transition hover:text-white focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2fc4c1]/30"
            >
              bspartners.vaperforma@gmail.com
            </a>

            <p className="mt-3 text-xs leading-5 text-[#7fa9a3]">
              For service inquiries, Discovery Calls, and business concerns.
            </p>
          </div>
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
