import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SocialRail from "@/components/SocialRail";

export const metadata: Metadata = {
  title: {
    default: "VAPerforma",
    template: "%s | VAPerforma"
  },
  description:
    "Professional virtual services across administration, medical support, social media, customer support, scheduling, web development, video editing, legal assistance, and data entry.",
  keywords: [
    "Virtual Assistant services",
    "Executive assistance",
    "Medical Virtual Assistant",
    "Customer support",
    "Social media management",
    "Website development",
    "Video editing",
    "Legal Virtual Assistant",
    "Data entry"
  ],
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
};

export const viewport: Viewport = {
  themeColor: "#092b30",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SocialRail />
      </body>
    </html>
  );
}
