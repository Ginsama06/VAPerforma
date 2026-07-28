import { socialLinks } from "@/data/site";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TikTokIcon
} from "@/components/Icons";

const icons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  tiktok: TikTokIcon
};

export default function SocialRail() {
  return (
    <aside
      aria-label="VAPerforma social media"
      className="social-rail fixed right-4 z-40 flex flex-col gap-3 sm:right-7"
    >
      {socialLinks.map((social) => {
        const Icon = icons[social.icon];

        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open VAPerforma on ${social.name}`}
            aria-label={`Open VAPerforma on ${social.name} in a new tab`}
            className="social-link group relative grid h-12 w-12 place-items-center rounded-full border border-white/75 bg-white text-[#0b7472] shadow-lg shadow-[#103f3b]/15 transition hover:-translate-y-1 hover:bg-[#20aaa6] hover:text-white focus-visible:-translate-y-1 focus-visible:bg-[#20aaa6] focus-visible:text-white"
          >
            <span className="social-tooltip pointer-events-none absolute right-14 inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#092b30] px-3 py-2 text-xs font-black text-white opacity-0 shadow-xl transition-all group-hover:opacity-100 group-focus-visible:opacity-100">
              <Icon className="h-4 w-4" />
              Follow on {social.name}
            </span>

            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </aside>
  );
}
