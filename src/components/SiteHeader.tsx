"use client";

import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import { CloseIcon, MenuIcon } from "@/components/Icons";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-us", label: "Why Us" },
  { href: "#get-started", label: "Get Started" }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = links.map((link) => link.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.05, 0.2, 0.5]
      }
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9ece7]/80 bg-white/[0.92] backdrop-blur-xl">
      <div className="section-container flex min-h-20 items-center justify-between gap-5">
        <a
          href="#home"
          className="rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2fc4c1]/25"
          onClick={closeMenu}
        >
          <BrandLogo />
        </a>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#cfe5df] bg-[#f4fbf8] text-[#092b30] transition hover:border-[#83d5c6] lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 text-sm font-bold lg:flex"
        >
          {links.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;

            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={`rounded-lg px-1 py-2 transition ${
                  isActive
                    ? "text-[#159b98]"
                    : "text-[#4e6668] hover:text-[#092b30]"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <a href="#get-started" className="brand-button px-5 py-3">
            Schedule a Discovery Call
          </a>
        </nav>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#d9ece7] bg-white px-3 py-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 font-bold text-[#29484b] transition hover:bg-[#f0faf6]"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#get-started"
              onClick={closeMenu}
              className="brand-button mt-2 text-center"
            >
              Schedule a Discovery Call
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
