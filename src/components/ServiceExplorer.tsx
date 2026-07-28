"use client";

import { useEffect, useState } from "react";
import { services } from "@/data/site";
import type { Service } from "@/data/site";
import ServiceIcon from "@/components/ServiceIcon";
import {
  ArrowRightIcon,
  CheckIcon
} from "@/components/Icons";

export default function ServiceExplorer() {
  const [activeService, setActiveService] =
    useState<Service | null>(null);

  useEffect(() => {
    if (!activeService) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveService(null);
      }
    }

    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [activeService]);

  return (
    <>
      <div className="service-grid mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.slug}
            id={`service-${service.slug}`}
            className="service-card flex h-full scroll-mt-28 flex-col rounded-[1.75rem] border bg-white p-7"
          >
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-4">
                <span className="service-icon grid h-14 w-14 place-items-center rounded-2xl">
                  <ServiceIcon
                    name={service.icon}
                    className="h-7 w-7"
                  />
                </span>
              </div>

              <h3 className="service-card-title mt-6 text-2xl font-black leading-tight tracking-[-0.035em] text-[#092b30]">
                {service.title}
              </h3>

              <p className="service-card-description mt-3 text-sm leading-7 text-[#587074]">
                {service.description}
              </p>

              <p className="service-card-ideal mt-4 rounded-xl bg-[#f5fbf8] px-4 py-3 text-sm leading-6 text-[#426064]">
                <strong className="text-[#174c4f]">Best for:</strong>{" "}
                {service.idealFor}
              </p>

              <ul className="service-card-tasks mt-6 grid gap-3">
                {service.tasks.slice(0, 3).map((task) => (
                  <li
                    key={task}
                    className="flex gap-3 text-sm font-semibold leading-6 text-[#29484b]"
                  >
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#20aaa6]" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-card-actions mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setActiveService(service)}
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#cfe5df] bg-white px-4 py-3 text-center font-black text-[#365b5e] transition hover:border-[#74cfc0] hover:bg-[#f5fbf8] focus-visible:border-[#74cfc0] focus-visible:bg-[#f5fbf8]"
              >
                View Details
              </button>

              <a
                href={`/?service=${encodeURIComponent(
                  service.slug
                )}#get-started`}
                aria-label={`Book a session for ${service.title}`}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#159b98] px-4 py-3 text-center font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b7472] focus-visible:-translate-y-0.5"
              >
                Book a Session
                <ArrowRightIcon className="h-5 w-5 shrink-0" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {activeService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="service-modal fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6"
        >
          <button
            type="button"
            aria-label="Close service details"
            onClick={() => setActiveService(null)}
            className="absolute inset-0 bg-[#052629]/70 backdrop-blur-sm"
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/50 bg-white p-6 shadow-2xl sm:p-9">
            <div className="flex items-start justify-between gap-5">
              <span className="service-icon grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                <ServiceIcon
                  name={activeService.icon}
                  className="h-7 w-7"
                />
              </span>

              <button
                type="button"
                onClick={() => setActiveService(null)}
                aria-label="Close service details"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d6e9e3] bg-white text-2xl font-bold leading-none text-[#365b5e] transition hover:bg-[#eef9f5]"
              >
                ×
              </button>
            </div>

            <h3
              id="service-modal-title"
              className="mt-6 text-3xl font-black tracking-[-0.04em] text-[#092b30] sm:text-4xl"
            >
              {activeService.title}
            </h3>

            <p className="mt-4 text-base leading-8 text-[#587074]">
              {activeService.details}
            </p>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#dceee8] bg-[#f5fbf8] p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#159b98]">
                  Support can include
                </p>

                <ul className="mt-4 grid gap-3">
                  {activeService.tasks.map((task) => (
                    <li
                      key={task}
                      className="flex gap-3 text-sm leading-6 text-[#29484b]"
                    >
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#20aaa6]" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#e5ecc5] bg-[#fbfde9] p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#667520]">
                  Expected improvements
                </p>

                <ul className="mt-4 grid gap-3">
                  {activeService.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex gap-3 text-sm leading-6 text-[#29484b]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8cb38]"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm leading-7 text-[#587074]">
                  <strong className="text-[#174c4f]">Best for:</strong>{" "}
                  {activeService.idealFor}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setActiveService(null)}
                className="secondary-button px-6 py-3.5"
              >
                Close
              </button>

              <a
                href={`/?service=${encodeURIComponent(
                  activeService.slug
                )}#get-started`}
                className="brand-button inline-flex items-center justify-center gap-2 px-6 py-3.5"
              >
                Book This Service
                <ArrowRightIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
