import { services } from "@/data/site";

export default function ServiceStrip() {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      {services.map((service, index) => (
        <span
          key={service.slug}
          className="inline-flex items-center gap-3"
        >
          {index > 0 && (
            <span aria-hidden="true" className="text-[#b8cb38]">
              •
            </span>
          )}

          <a
            href={`#service-${service.slug}`}
            className="service-word"
          >
            {service.shortTitle}
          </a>
        </span>
      ))}
    </div>
  );
}
