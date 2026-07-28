"use client";

import { useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  MatchIcon,
  PeopleIcon,
  ShieldIcon
} from "@/components/Icons";

const reasons = [
  {
    icon: MatchIcon,
    title: "Focused matching",
    description:
      "Candidates are reviewed against the responsibilities, schedule, tools, and communication expectations of the role.",
    details:
      "We begin by defining the actual work before reviewing candidates. This creates a more focused shortlist and reduces the time spent sorting through unrelated profiles.",
    highlights: [
      "Clarify responsibilities, tools, schedule, and communication style",
      "Review experience and availability against the role",
      "Present only suitable candidates for client consideration"
    ],
    outcome:
      "A clearer shortlist built around the work your organization actually needs."
  },
  {
    icon: PeopleIcon,
    title: "Broad professional services",
    description:
      "Request administrative, medical, customer, social media, web, video, legal, scheduling, and data-entry support.",
    details:
      "VAPerforma supports multiple business functions, allowing an organization to request one focused service or combine related responsibilities into a customized support role.",
    highlights: [
      "Nine professional service categories in one place",
      "Combine related responsibilities into one role",
      "Adjust the scope as business priorities change"
    ],
    outcome:
      "Less fragmentation and one clearer path for organizing virtual support."
  },
  {
    icon: ClockIcon,
    title: "Flexible arrangements",
    description:
      "Explore part-time, full-time, project-based, and hourly support based on your operational needs.",
    details:
      "The working arrangement can be matched to the workload, schedule, project duration, and level of ongoing support your organization requires.",
    highlights: [
      "Part-time and full-time ongoing support",
      "Project-based help for defined deliverables",
      "Hourly support for flexible or changing workloads"
    ],
    outcome:
      "A practical arrangement that fits your current operational requirements."
  },
  {
    icon: ShieldIcon,
    title: "Guided onboarding",
    description:
      "Clarify workflows, ownership, communication, and expectations before work begins.",
    details:
      "The onboarding stage creates alignment before the working relationship starts. Responsibilities, communication routines, access, priorities, and escalation steps are reviewed together.",
    highlights: [
      "Confirm tools, workflows, access, and ownership",
      "Set communication, reporting, and escalation expectations",
      "Establish initial priorities and a clear working rhythm"
    ],
    outcome:
      "A more organized start with fewer assumptions and clearer expectations."
  }
];

export default function WhyUsCards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeReason =
    activeIndex === null ? null : reasons[activeIndex];

  return (
    <div className="why-stable-section">
      <div className="why-stable-grid grid gap-5 sm:grid-cols-2">
        {reasons.map(
          ({ icon: Icon, title, description }, index) => {
            const selected = activeIndex === index;

            return (
              <button
                key={title}
                type="button"
                aria-expanded={selected}
                aria-controls="why-shared-details"
                onClick={() =>
                  setActiveIndex(selected ? null : index)
                }
                className={`why-stable-card group relative isolate flex min-h-[17rem] w-full overflow-hidden rounded-[1.6rem] border p-6 text-left text-white focus-visible:outline-none ${
                  selected ? "is-selected" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="why-stable-glow absolute -right-16 -top-16 h-40 w-40 rounded-full"
                />

                <span
                  aria-hidden="true"
                  className="why-stable-number absolute right-5 top-4 text-sm font-black tracking-[0.18em]"
                >
                  0{index + 1}
                </span>

                <span className="relative z-10 flex w-full flex-col">
                  <span className="why-stable-icon grid h-12 w-12 place-items-center rounded-2xl border border-[#dce45a]/25 bg-[#dce45a]/10">
                    <Icon className="h-7 w-7 text-[#dce45a]" />
                  </span>

                  <h3 className="mt-6 text-xl font-black">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#c7ded9]">
                    {description}
                  </p>

                  <span className="why-stable-action mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-[#dce45a]">
                    {selected ? "Hide details" : "View details"}

                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        selected ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </span>
              </button>
            );
          }
        )}
      </div>

      <div
        id="why-shared-details"
        className={`why-shared-panel ${
          activeReason ? "is-open" : ""
        }`}
        aria-hidden={!activeReason}
      >
        <div className="why-shared-panel-clip">
          {activeReason && (
            <div
              key={activeReason.title}
              className="why-shared-panel-content"
            >
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#dce45a]">
                    {activeReason.title}
                  </p>

                  <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                    How this supports your organization
                  </h3>

                  <p className="mt-4 text-base leading-8 text-[#d9ece8]">
                    {activeReason.details}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8be3d8]">
                    What this includes
                  </p>

                  <ul className="mt-4 grid gap-3">
                    {activeReason.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-6 text-[#d9ece8]"
                      >
                        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#dce45a]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#dce45a]/20 bg-[#dce45a]/10 px-5 py-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#dce45a]">
                  Expected result
                </p>

                <p className="mt-2 text-sm leading-7 text-[#eef7f4]">
                  {activeReason.outcome}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
