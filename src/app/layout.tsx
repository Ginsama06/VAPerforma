import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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
  ]
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
