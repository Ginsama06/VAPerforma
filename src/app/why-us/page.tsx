import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  ArrowRightIcon,
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
      "Candidates are reviewed against the responsibilities, schedule, tools, and communication expectations of the role."
  },
  {
    icon: PeopleIcon,
    title: "Broad professional services",
    description:
      "Your organization can request administrative, medical, customer, social media, web, video, legal, and data-entry support."
  },
  {
    icon: ClockIcon,
    title: "Flexible arrangements",
    description:
      "Explore part-time, full-time, project-based, and hourly support based on your operational needs."
  },
  {
    icon: ShieldIcon,
    title: "Guided onboarding",
    description:
      "We help clarify workflows, ownership, communication, and expectations before work begins."
  }
];

export default function WhyUsPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Why VAPerforma"
        title="A trusted partner for professional virtual services."
        description="We help organizations define the support they need, review suitable professionals, and create a clear path into onboarding."
      />

      <section className="bg-white py-24 sm:py-28">
        <div className="section-container grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Built around your business</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">
              The right support creates more room for focus, service, and
              growth.
            </h2>
            <p className="mt-7 text-lg leading-9 text-slate-600">
              Reliable virtual support can improve responsiveness, reduce
              administrative pressure, and help your core team protect time
              for higher-value responsibilities.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-[1.6rem] border border-slate-200 bg-[#f6f8fb] p-6"
              >
                <Icon className="h-8 w-8 text-blue-700" />
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="section-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow eyebrow-light">
              Comprehensive virtual services
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              One partner for the support functions that keep your business
              moving.
            </h2>
          </div>

          <Link
            href="/apply"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-slate-950 transition hover:bg-[#fff7dc]"
          >
            Get Started
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
