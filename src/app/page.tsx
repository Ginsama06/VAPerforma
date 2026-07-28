import BrandLogo from "@/components/BrandLogo";
import HowItWorks from "@/components/HowItWorks";
import LeadForms from "@/components/LeadForms";
import ServiceExplorer from "@/components/ServiceExplorer";
import ServiceStrip from "@/components/ServiceStrip";
import WhyUsCards from "@/components/WhyUsCards";
import { services } from "@/data/site";
import {
  ArrowRightIcon,
  CheckIcon
} from "@/components/Icons";


type HomePageProps = {
  searchParams: Promise<{
    service?: string | string[];
  }>;
};

export default async function HomePage({
  searchParams
}: HomePageProps) {
  const params = await searchParams;
  const requestedSlug = Array.isArray(params.service)
    ? params.service[0]
    : params.service;
  const initialService =
    services.find((service) => service.slug === requestedSlug)?.title ?? "";

  return (
    <main id="main-content" className="page-shell">
      <section
        id="home"
        className="hero-section scroll-mt-20 overflow-hidden"
      >
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="section-container relative grid min-h-[700px] items-center gap-12 py-20 lg:grid-cols-[1.12fr_0.88fr] lg:py-28">
          <div>
            <p className="eyebrow">Professional virtual services</p>

            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#092b30] sm:text-6xl lg:text-[4.85rem]">
              Virtual support that keeps your{" "}
              <span className="brand-gradient-text">
                business moving.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#587074] sm:text-xl">
              VAPerforma connects organizations with professional support
              across administration, healthcare operations, customer service,
              social media, scheduling, website development, video editing,
              legal administration, and data entry.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#get-started"
                className="brand-button inline-flex items-center justify-center gap-2 px-7 py-4"
              >
                Schedule a Discovery Call
                <ArrowRightIcon className="h-5 w-5" />
              </a>

              <a
                href="#services"
                className="secondary-button px-7 py-4 text-center"
              >
                Explore Services
              </a>
            </div>

            <div
              aria-label="VAPerforma process shortcuts"
              className="mt-10 flex flex-wrap gap-3"
            >
              <a href="#how-it-works" className="hero-process-chip">
                Discovery Call
              </a>
              <a href="#how-it-works" className="hero-process-chip">
                Talent Matching
              </a>
              <a href="#how-it-works" className="hero-process-chip">
                Onboarding Session
              </a>
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-[500px] place-items-center">
            <div className="hero-logo-halo" />

            <div className="hero-brand-card relative grid min-h-[360px] w-full place-items-center rounded-[2.5rem] border border-white/75 bg-white/[0.68] p-8 text-center backdrop-blur-lg sm:min-h-[430px]">
              <div>
                <BrandLogo size="hero" />

                <p className="mx-auto mt-8 max-w-sm text-sm font-black uppercase tracking-[0.18em] text-[#648083]">
                  Virtual Assistance, performed better
                </p>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#587074]">
                  One guided partner for the support functions that keep your
                  organization responsive, organized, and ready to grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dceee8] bg-white py-9">
        <div className="section-container">
          <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-[#648083]">
            Designed for organizations that need reliable operational support
          </p>

          <ServiceStrip />
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-20 bg-[#f4fbf8] py-24 sm:py-28"
      >
        <div className="section-container">
          <div className="max-w-4xl">
            <p className="eyebrow">Choose the support you need</p>

            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-[#092b30] sm:text-5xl">
              One partner for the work that keeps your organization moving.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#587074]">
              Select View Details for a complete service overview. Choose{" "}
              <strong>Discovery Call</strong> and the inquiry form will
              automatically select that service for you.
            </p>
          </div>

          <ServiceExplorer />
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-20 bg-white py-24 sm:py-28"
      >
        <div className="section-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow justify-center">A clear guided process</p>

            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-[#092b30] sm:text-5xl">
              From discovery to a confident working start.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#587074]">
              Hover, focus, or tap a step to enlarge it and reveal what happens
              during that stage.
            </p>
          </div>

          <HowItWorks />

          <div className="mt-12 text-center">
            <a
              href="#get-started"
              className="brand-button inline-flex items-center gap-2 px-7 py-4"
            >
              Schedule a Discovery Call
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="why-us"
        className="scroll-mt-20 bg-[#092b30] py-24 text-white sm:py-28"
      >
        <div className="section-container grid items-start gap-14 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="eyebrow eyebrow-light">Why VAPerforma</p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">
              The right support creates more room for focus, service, and
              growth.
            </h2>

            <p className="mt-7 text-lg leading-9 text-[#c7ded9]">
              We help organizations define the work, review suitable support,
              and create a clearer path into onboarding—without forcing
              clients to search through an overwhelming directory.
            </p>

            <a
              href="#get-started"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-[#092b30] transition hover:-translate-y-0.5 hover:bg-[#e8f6ef]"
            >
              Start the Conversation
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>

          <WhyUsCards />
        </div>
      </section>

      <section
        id="get-started"
        className="scroll-mt-20 bg-[#f4fbf8] py-24 sm:py-28"
      >
        <div className="section-container grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Schedule a discovery call</p>

            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-[#092b30] sm:text-5xl">
              Tell us what your organization needs.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#587074]">
              Your inquiry goes directly to the VAPerforma business email.
              A team member can review the role and contact you about the
              next step.
            </p>

            <ul className="mt-8 grid gap-4">
              {[
                "Select one service or combine several responsibilities",
                "Estimated monthly budget is optional",
                "Use the client email field so we can reply directly",
                "Do not include confidential or protected information"
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-semibold text-[#29484b]"
                >
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#20aaa6]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <LeadForms initialService={initialService} />
        </div>
      </section>
    </main>
  );
}
