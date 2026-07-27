import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarIcon,
  MatchIcon,
  OnboardingIcon
} from "@/components/Icons";

const serviceStrip = [
  "Administrative Support",
  "Medical Virtual Assistant",
  "Customer Support",
  "Social Media",
  "Web",
  "Video",
  "Legal",
  "Data Entry"
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "Understand the role, schedule, tools, and business priorities.",
    icon: CalendarIcon
  },
  {
    number: "02",
    title: "Talent Matching",
    description:
      "Present the strongest Virtual Assistant candidates.",
    icon: MatchIcon
  },
  {
    number: "03",
    title: "Onboarding Session",
    description:
      "Align responsibilities, communication, and expectations before work begins.",
    icon: OnboardingIcon
  }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="professional-hero relative overflow-hidden text-white">
        <div className="subtle-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-12 top-36 h-52 w-52 rounded-full border border-white/10" />

        <div className="section-container relative flex min-h-[650px] items-center py-20 lg:py-28">
          <div className="max-w-5xl">
            <p className="eyebrow eyebrow-light">
              Comprehensive virtual services, delivered with excellence
            </p>

            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-[4.9rem]">
              Your trusted partner for{" "}
              <span className="text-[#f6c95f]">
                professional virtual services.
              </span>
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
              We provide Executive and Administrative Assistance, Medical
              Virtual Assistance, Social Media Management, Customer Support,
              Appointment Scheduling, Website Development, Video Editing,
              Legal Virtual Assistance, and Data Entry and Administrative
              Support—all in one place.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500"
              >
                Schedule a Discovery Call
                <ArrowRightIcon className="h-5 w-5" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-4 font-black text-white transition hover:bg-white hover:text-slate-950"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-9">
        <div className="section-container">
          <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Designed for organizations that need reliable operational support
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-black text-slate-800">
            {serviceStrip.map((service, index) => (
              <span key={service} className="inline-flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-blue-600">
                    •
                  </span>
                )}
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8fb] py-24 sm:py-28">
        <div className="section-container grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Simple by design</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl">
              One guided process from discovery to onboarding.
            </h2>

            <Link
              href="/how-it-works"
              className="mt-8 inline-flex items-center gap-2 font-black text-blue-700 transition hover:text-blue-900"
            >
              See how the process works
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-4">
            {processSteps.map(({ number, title, description, icon: Icon }) => (
              <article
                key={number}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 soft-shadow"
              >
                <div className="flex gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-950 text-sm font-black text-white">
                    {number}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-black">{title}</h3>
                      <Icon className="h-6 w-6 shrink-0 text-blue-700" />
                    </div>
                    <p className="mt-2 leading-7 text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-16 text-white">
        <div className="section-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
              Ready to explore the right support?
            </p>

            <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
              Your success starts with the right support. Tell us what your
              organization needs, and we’ll match you with a top-tier Virtual
              Assistant ready to help your business grow.
            </h2>
          </div>

          <Link
            href="/apply"
            className="shrink-0 rounded-full bg-white px-7 py-4 font-black text-blue-800 transition hover:bg-[#fff7dc]"
          >
            Schedule a Discovery Call
          </Link>
        </div>
      </section>
    </main>
  );
}
