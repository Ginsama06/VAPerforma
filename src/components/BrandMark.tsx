import Image from "next/image";

type BrandMarkProps = {
  size?: "small" | "default" | "large" | "hero";
  priority?: boolean;
};

const sizeClasses = {
  small: "h-9 w-9",
  default: "h-12 w-12",
  large: "h-16 w-16",
  hero: "h-28 w-28 sm:h-36 sm:w-36"
};

export default function BrandMark({
  size = "default",
  priority = false
}: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`vaperforma-logo-scene ${sizeClasses[size]} shrink-0`}
    >
      <span className="vaperforma-logo-spinner">
        <Image
          src="/vaperforma-va-mark.png"
          alt=""
          width={1046}
          height={1046}
          priority={priority}
          sizes={
            size === "hero"
              ? "(max-width: 640px) 112px, 144px"
              : "64px"
          }
          className="h-full w-full object-contain"
        />
      </span>
    </span>
  );
}
