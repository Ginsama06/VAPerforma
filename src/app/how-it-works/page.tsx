import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  ArrowRightIcon,
  CalendarIcon,
  MatchIcon,
  OnboardingIcon
} from "@/components/Icons";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We learn about your organization, responsibilities, work schedule, software, communication expectations, and budget.",
    icon: CalendarIcon,
    accent: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    number: "02",
    title: "Talent Matching",
    description:
      "We review qualified professionals and present the strongest Virtual Assistant candidates for your requirements.",
    icon: MatchIcon,
    accent: "bg-amber-50 text-amber-800 border-amber-200"
  },
  {
    number: "03",
    title: "Onboarding Session",
    description:
      "We align responsibilities, workflows, tools, communication, and expectations before the working relationship begins.",
    icon: OnboardingIcon,
    accent: "bg-violet-50 text-violet-700 border-violet-200"
  }
];

export default function HowItWorksPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="How we connect"
        title="A clear process from discovery to onboarding."
        description="The process gives your organization a focused path from identifying the need to beginning work with a carefully matched Virtual Assistant."
      />

      <section className="bg-white py-24 sm:py-28">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className={`card-lift rounded-[2rem] border p-8 ${step.accent}`}
                >
                  <div className="flex items-center justify-between gap-5">
                    <span className="text-sm font-black tracking-[0.18em]">
                      STEP {step.number}
                    </span>
                    <Icon className="h-10 w-10" />
                  </div>

                  <h2 className="mt-10 text-3xl font-black tracking-[-0.04em] text-slate-950">
                    {step.title}
                  </h2>

                  <p className="mt-5 leading-8 text-slate-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-16 grid gap-10 rounded-[2rem] bg-[#f6f8fb] p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">What clients can expect</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.045em]">
                Fewer assumptions. Better alignment.
              </h2>
            </div>

            <div className="space-y-4 text-lg leading-8 text-slate-600">
              <p>
                The discovery process clarifies the actual responsibilities
                and outcomes your organization needs.
              </p>
              <p>
                The selected Virtual Assistant begins with a clearer
                understanding of the tools, communication, priorities, and
                performance expectations.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-7 py-4 font-black text-white transition hover:bg-blue-800"
            >
              Schedule a Discovery Call
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
