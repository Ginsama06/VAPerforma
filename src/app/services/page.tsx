import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  CustomerOperationsIcon,
  DataEntryIcon,
  ExecutiveIcon,
  HealthcareIcon,
  LegalIcon,
  ReceptionIcon,
  SocialMediaIcon,
  VideoIcon,
  WebsiteIcon
} from "@/components/Icons";

const serviceGroups = [
  {
    title: "Executive and Administrative Assistance",
    description:
      "Reliable day-to-day support that keeps leaders, teams, schedules, and information organized.",
    icon: ExecutiveIcon,
    accent: "border-amber-200 bg-amber-50 text-amber-800",
    services: [
      "Calendar and inbox management",
      "Travel and meeting coordination",
      "Business research and reports",
      "Document and presentation support"
    ]
  },
  {
    title: "Medical Virtual Assistance",
    description:
      "Administrative support for healthcare organizations and medical practices without providing clinical advice.",
    icon: HealthcareIcon,
    accent: "border-emerald-200 bg-emerald-50 text-emerald-800",
    services: [
      "Insurance verification assistance",
      "Prior authorization support",
      "Patient scheduling and follow-up",
      "Referral and documentation coordination"
    ]
  },
  {
    title: "Social Media Management",
    description:
      "Consistent support for planning, publishing, organizing, and monitoring your social media presence.",
    icon: SocialMediaIcon,
    accent: "border-violet-200 bg-violet-50 text-violet-800",
    services: [
      "Content calendar coordination",
      "Post scheduling and publishing",
      "Community inbox monitoring",
      "Basic performance reporting"
    ]
  },
  {
    title: "Customer Support",
    description:
      "Responsive customer communication across the channels your business relies on.",
    icon: CustomerOperationsIcon,
    accent: "border-blue-200 bg-blue-50 text-blue-800",
    services: [
      "Email and live chat support",
      "Customer request coordination",
      "Customer Relationship Management updates",
      "Help desk and follow-up support"
    ]
  },
  {
    title: "Appointment Scheduling and Reception",
    description:
      "Professional scheduling and front-desk support that helps customers reach the right person at the right time.",
    icon: ReceptionIcon,
    accent: "border-rose-200 bg-rose-50 text-rose-800",
    services: [
      "Appointment booking and rescheduling",
      "Calendar and reminder management",
      "Telephone and message coordination",
      "Basic client intake assistance"
    ]
  },
  {
    title: "Website Development",
    description:
      "Practical website creation and maintenance support for modern businesses and service providers.",
    icon: WebsiteIcon,
    accent: "border-cyan-200 bg-cyan-50 text-cyan-800",
    services: [
      "Business and landing-page development",
      "Content and design updates",
      "Content management system support",
      "Basic maintenance and quality checks"
    ]
  },
  {
    title: "Video Editing",
    description:
      "Clean and engaging video production support for marketing, training, social media, and business content.",
    icon: VideoIcon,
    accent: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800",
    services: [
      "Short-form and long-form editing",
      "Captions and basic motion graphics",
      "Content resizing and repurposing",
      "Audio cleanup and visual organization"
    ]
  },
  {
    title: "Legal Virtual Assistance",
    description:
      "Administrative support for legal teams and law offices without replacing licensed legal advice.",
    icon: LegalIcon,
    accent: "border-orange-200 bg-orange-50 text-orange-800",
    services: [
      "Document and file organization",
      "Calendar and deadline coordination",
      "Client intake administration",
      "Research and case-support administration"
    ]
  },
  {
    title: "Data Entry and General Administrative Support",
    description:
      "Accurate and dependable support for records, documents, spreadsheets, and recurring administrative work.",
    icon: DataEntryIcon,
    accent: "border-slate-200 bg-slate-50 text-slate-800",
    services: [
      "Data entry and spreadsheet updates",
      "File and folder organization",
      "Document formatting",
      "Recurring administrative assistance"
    ]
  }
];

export default function ServicesPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Comprehensive virtual services"
        title="Your trusted partner for professional virtual services."
        description="Executive and Administrative Assistance, Medical Virtual Assistance, Social Media Management, Customer Support, Appointment Scheduling, Website Development, Video Editing, Legal Virtual Assistance, and Data Entry and Administrative Support—all in one place."
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="section-container">
          <div className="max-w-4xl">
            <p className="eyebrow">Professional service areas</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Choose the support your business needs.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Select one service or combine multiple responsibilities into a
              customized Virtual Assistant role.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceGroups.map((group) => {
              const Icon = group.icon;

              return (
                <article
                  key={group.title}
                  className="card-lift rounded-[1.75rem] border border-slate-200 bg-white p-7"
                >
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl border ${group.accent}`}
                  >
                    <Icon className="h-7 w-7" />
                  </span>

                  <h3 className="mt-6 text-2xl font-black tracking-[-0.035em] text-slate-950">
                    {group.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {group.description}
                  </p>

                  <ul className="mt-6 grid gap-3">
                    {group.services.map((service) => (
                      <li
                        key={service}
                        className="flex gap-3 text-sm font-semibold leading-6 text-slate-700"
                      >
                        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8fb] py-20 sm:py-24">
        <div className="section-container rounded-[2rem] bg-slate-950 p-8 text-white sm:p-12">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow eyebrow-light">
                Build the right support role
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Tell us which responsibilities are taking time away from
                your core team.
              </h2>
            </div>

            <Link
              href="/apply"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-7 py-4 font-black text-white transition hover:bg-blue-500"
            >
              Request Professional Support
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
