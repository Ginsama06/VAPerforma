import Image from "next/image";

type BrandMarkProps = {
  size?: "small" | "default" | "large";
};

const sizeClasses = {
  small: "h-9 w-9",
  default: "h-11 w-11",
  large: "h-14 w-14"
};

export default function BrandMark({
  size = "default"
}: BrandMarkProps) {
  return (
    <span
      className={`vaperforma-beyblade-scene ${sizeClasses[size]} shrink-0`}
    >
      <span className="vaperforma-beyblade-spinner">
        <Image
          src="/vaperforma-logo.png"
          alt=""
          width={512}
          height={512}
          priority
          className="h-full w-full object-contain"
        />
      </span>
    </span>
  );
}
