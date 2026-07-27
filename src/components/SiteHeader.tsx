"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandMark from "@/components/BrandMark";
import { CloseIcon, MenuIcon } from "@/components/Icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-us", label: "Why Us" },
  { href: "/apply", label: "Get Started" }
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="section-container flex min-h-20 items-center justify-between gap-5">
        <Link
          href="/why-us"
          aria-label="Learn why clients choose VAPerforma"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <span className="text-base font-black tracking-[-0.025em] text-slate-950 sm:text-lg">
            VAPerforma
          </span>
        </Link>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900 lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav className="hidden items-center gap-6 text-sm font-bold lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                isActive(link.href)
                  ? "text-blue-700"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/apply"
            className="rounded-full bg-blue-700 px-5 py-2.5 font-black text-white shadow-sm transition hover:bg-blue-800"
          >
            Schedule a Discovery Call
          </Link>
        </nav>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-3 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 font-bold ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-blue-700 px-4 py-3 text-center font-black text-white"
            >
              Schedule a Discovery Call
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
