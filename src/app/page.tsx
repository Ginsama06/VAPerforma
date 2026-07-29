import HowItWorks from "@/components/HowItWorks";
import LeadForms from "@/components/LeadForms";
import ServiceExplorer from "@/components/ServiceExplorer";
import ServiceStrip from "@/components/ServiceStrip";
import WhyUsCards from "@/components/WhyUsCards";
import { services } from "@/data/site";
import { ArrowRightIcon } from "@/components/Icons";


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

        <div className="section-container relative flex min-h-[640px] items-center py-20 sm:py-24 lg:py-28">
          <div className="max-w-[920px]">
            <h1 className="max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#092b30] sm:text-6xl lg:text-[5rem]">
              Virtual support that keeps your{" "}
              <span className="brand-gradient-text">
                business moving.
              </span>
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-[#587074] sm:text-xl">
              VA Performa connects organizations with professional support
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
            <h2 className="services-section-title">
              Choose the support you need
            </h2>
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
            <p className="eyebrow eyebrow-light">Why VA Performa</p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">
              The right support creates more room for focus, service, and
              growth.
            </h2>

            <p className="mt-7 text-lg leading-9 text-[#c7ded9]">
              VA Performa delivers affordable, secure, and flexible virtual
              staffing solutions with expertly screened professionals,
              tailored client matching, continuous quality assurance, and
              HIPAA-certified operations.
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
        <div className="section-container grid items-start gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Schedule a discovery call</p>

            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-[#092b30] sm:text-5xl">
              Tell us what your organization needs.
            </h2>
          </div>

          <LeadForms initialService={initialService} />
        </div>
      </section>
    </main>
  );
}
