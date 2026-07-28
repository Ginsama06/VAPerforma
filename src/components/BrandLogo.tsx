import BrandMark from "@/components/BrandMark";
import { GlobeIcon } from "@/components/Icons";

type BrandLogoProps = {
  size?: "header" | "footer" | "hero";
  light?: boolean;
};

const configuration = {
  header: {
    mark: "default" as const,
    wordmark: "text-[0.9rem] sm:text-base",
    gap: "gap-3"
  },
  footer: {
    mark: "large" as const,
    wordmark: "text-base sm:text-lg",
    gap: "gap-3.5"
  },
  hero: {
    mark: "hero" as const,
    wordmark: "text-2xl sm:text-3xl lg:text-4xl",
    gap: "gap-5"
  }
};

export default function BrandLogo({
  size = "header",
  light = false
}: BrandLogoProps) {
  const config = configuration[size];

  return (
    <span
      role="img"
      aria-label="VAPerforma"
      className={`vaperforma-brand-logo inline-flex items-center ${config.gap}`}
    >
      <BrandMark size={config.mark} priority={size === "hero"} />

      <span
        aria-hidden="true"
        className={`inline-flex items-center whitespace-nowrap font-black tracking-[0.2em] ${config.wordmark} ${
          light ? "text-white" : "text-[#092b30]"
        }`}
      >
        PERF

        <span className="vaperforma-globe-scene mx-0.5">
          <span className="vaperforma-globe-spinner">
            <GlobeIcon className="h-[1.08em] w-[1.08em] text-[#2fc4c1]" />
          </span>
        </span>

        RMA
      </span>
    </span>
  );
}
