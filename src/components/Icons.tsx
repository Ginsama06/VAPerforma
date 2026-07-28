import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true
};

export function ArrowRightIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
}
export function ChevronDownIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m6 9 6 6 6-6"/></svg>;
}
export function MenuIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
}
export function CloseIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m6 6 12 12M18 6 6 18"/></svg>;
}
export function CheckIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m5 12 4 4L19 6"/></svg>;
}
export function GlobeIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>;
}
export function ExecutiveIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0M8 3h8"/></svg>;
}
export function HealthcareIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z"/><path d="M9 12h2l1-2 1 4 1-2h2"/></svg>;
}
export function SocialMediaIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="7" cy="17" r="3"/><circle cx="17" cy="7" r="3"/><path d="M9.5 15.5 14.5 8.5M9.5 8.5l5 7"/></svg>;
}
export function CustomerOperationsIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2v1ZM20 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2v1Z"/><path d="M17 18c0 1.5-1.5 3-4 3h-1"/></svg>;
}
export function CalendarIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>;
}
export function WebsiteIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="m9 13-2 2 2 2M15 13l2 2-2 2"/></svg>;
}
export function VideoIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m17 10 4-2v8l-4-2"/><path d="m9 9 4 3-4 3V9Z"/></svg>;
}
export function LegalIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 3v18M6 6h12"/><path d="m7 6-4 7h8L7 6ZM17 6l-4 7h8l-4-7Z"/><path d="M8 21h8"/></svg>;
}
export function DataEntryIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>;
}
export function MatchIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/><path d="m10.2 10.2 3.6 3.6M14.8 7.2h4v4M9.2 16.8h-4v-4"/></svg>;
}
export function OnboardingIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 19h16"/><path d="M7 16V8l5-3 5 3v8"/><path d="M10 16v-4h4v4"/></svg>;
}
export function ShieldIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
}
export function PeopleIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 20a5 5 0 0 1 7 0"/></svg>;
}
export function ClockIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}
export function FacebookIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z"/></svg>;
}
export function InstagramIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>;
}
export function LinkedinIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a3 3 0 0 1 6 0v4M12 10v7"/></svg>;
}
export function TikTokIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M15 4c.6 2.4 2.1 3.8 4 4.2v3.1a8 8 0 0 1-4-1.2V16a5 5 0 1 1-5-5c.4 0 .8 0 1.2.1v3.2A2 2 0 1 0 12 16V4h3Z"/></svg>;
}
