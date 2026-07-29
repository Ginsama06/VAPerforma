export type ServiceIconName =
  | "executive"
  | "medical"
  | "dental"
  | "social"
  | "customer"
  | "calendar"
  | "website"
  | "video"
  | "legal"
  | "data";

export type SocialIconName =
  | "linkedin"
  | "tiktok"
  | "instagram"
  | "facebook";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  idealFor: string;
  details: string;
  outcomes: readonly string[];
  tasks: readonly string[];
  icon: ServiceIconName;
};

export const services = [
  {
    slug: "executive-administrative-assistance",
    title: "Executive and Administrative Assistance",
    shortTitle: "Administrative Support",
    description:
      "Reliable day-to-day support that keeps leaders, teams, schedules, documents, and communication organized.",
    idealFor:
      "Founders, executives, managers, and operations teams with recurring administrative work.",
    details:
      "A flexible support function for busy teams that need consistent ownership of calendars, communication, documents, research, and recurring workflows.",
    outcomes: [
      "More protected focus time for leadership",
      "Better-organized schedules, files, and follow-ups",
      "Clearer coordination across daily priorities"
    ],
    tasks: [
      "Calendar and inbox management",
      "Meeting, travel, and event coordination",
      "Business research and report preparation",
      "Document, spreadsheet, and presentation support",
      "Process documentation and recurring task management"
    ],
    icon: "executive"
  },
  {
    slug: "medical-virtual-assistance",
    title: "Medical Virtual Assistance",
    shortTitle: "Medical Virtual Assistant",
    description:
      "Administrative support for healthcare organizations and medical practices without providing clinical advice.",
    idealFor:
      "Clinics, private practices, healthcare groups, and non-clinical medical operations teams.",
    details:
      "Designed for practices that need dependable help with front-office coordination, documentation workflows, and non-clinical patient communication.",
    outcomes: [
      "More responsive administrative workflows",
      "Fewer scheduling and documentation backlogs",
      "Consistent non-clinical patient follow-up"
    ],
    tasks: [
      "Insurance verification assistance",
      "Prior authorization support",
      "Claims submission",
      "Medical billing",
      "Patient scheduling and reminders",
      "Referral and documentation coordination",
      "Non-clinical inbox and follow-up support"
    ],
    icon: "medical"
  },
  {
    slug: "dental-virtual-assistance",
    title: "Dental Virtual Assistance",
    shortTitle: "Dental Virtual Assistant",
    description:
      "Administrative support for dental practices across scheduling, insurance, claims, billing, and patient follow-up.",
    idealFor:
      "Dental clinics, orthodontic practices, oral surgery offices, and non-clinical dental operations teams.",
    details:
      "Designed for dental practices that need dependable front-office and administrative support with appointments, insurance, claims, billing coordination, treatment plans, and patient recall.",
    outcomes: [
      "More organized scheduling and patient follow-up",
      "Faster claims and billing workflows",
      "More consistent insurance and treatment-plan coordination"
    ],
    tasks: [
      "Dental appointment scheduling and reminders",
      "Insurance eligibility verification",
      "Dental claims submission",
      "Dental billing and payment follow-up",
      "Treatment-plan coordination",
      "Patient recall and follow-up",
      "Referral and document management"
    ],
    icon: "dental"
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    shortTitle: "Social Media",
    description:
      "Consistent planning, publishing, community support, and reporting for your social media presence.",
    idealFor:
      "Brands, service providers, and growing businesses that need a reliable publishing rhythm.",
    details:
      "A practical service for brands that need dependable content coordination and audience engagement without building a full in-house social team.",
    outcomes: [
      "More consistent publishing",
      "Faster response to comments and messages",
      "Better visibility into content performance"
    ],
    tasks: [
      "Content calendar coordination",
      "Post scheduling and publishing",
      "Caption and creative support",
      "Community inbox and comment monitoring",
      "Performance and engagement reports"
    ],
    icon: "social"
  },
  {
    slug: "customer-support",
    title: "Customer Support",
    shortTitle: "Customer Support",
    description:
      "Responsive customer communication across the channels your business relies on.",
    idealFor:
      "Businesses that need dependable frontline assistance and organized customer follow-up.",
    details:
      "For teams that need timely responses, clear case ownership, accurate customer records, and clean handoffs for service requests.",
    outcomes: [
      "Faster customer response times",
      "More consistent follow-up and case ownership",
      "Cleaner customer records and handoffs"
    ],
    tasks: [
      "Email, live chat, and ticket support",
      "Customer request coordination",
      "Customer Relationship Management updates",
      "Help desk and follow-up support",
      "Escalation notes and service reporting"
    ],
    icon: "customer"
  },
  {
    slug: "appointment-scheduling-reception",
    title: "Appointment Scheduling and Reception",
    shortTitle: "Scheduling and Reception",
    description:
      "Professional scheduling and front-desk support that helps customers reach the right person at the right time.",
    idealFor:
      "Appointment-based businesses, professional services, clinics, and customer-facing teams.",
    details:
      "A virtual reception function that supports booking, reminders, message handling, rescheduling, and basic client intake.",
    outcomes: [
      "Fewer missed appointments",
      "More organized calendars",
      "A more professional first response"
    ],
    tasks: [
      "Appointment booking and rescheduling",
      "Calendar and reminder management",
      "Telephone and message coordination",
      "Basic client intake assistance",
      "Confirmation and follow-up communication"
    ],
    icon: "calendar"
  },
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Website Development",
    description:
      "Practical website creation, updates, maintenance, and quality support for modern businesses.",
    idealFor:
      "Businesses that need a landing page, company website, content updates, or ongoing web support.",
    details:
      "Suitable for organizations that need a credible online presence, responsive layouts, content management, or dependable maintenance.",
    outcomes: [
      "A clearer and more credible online presence",
      "Faster content and design updates",
      "More reliable website maintenance"
    ],
    tasks: [
      "Business and landing-page development",
      "Responsive layout implementation",
      "Content and design updates",
      "Content management system support",
      "Maintenance and quality checks"
    ],
    icon: "website"
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    shortTitle: "Video Editing",
    description:
      "Clean and engaging video production support for marketing, training, social media, and business content.",
    idealFor:
      "Brands, creators, educators, and teams producing recurring short-form or long-form video.",
    details:
      "A flexible editing service for organizations that need polished, reusable video content without expanding their internal production team.",
    outcomes: [
      "Faster turnaround for video content",
      "More consistent visual presentation",
      "More reusable content across platforms"
    ],
    tasks: [
      "Short-form and long-form editing",
      "Captions and basic motion graphics",
      "Content resizing and repurposing",
      "Audio cleanup and visual organization",
      "Export preparation for major platforms"
    ],
    icon: "video"
  },
  {
    slug: "legal-virtual-assistance",
    title: "Legal Virtual Assistance",
    shortTitle: "Legal Virtual Assistant",
    description:
      "Administrative support for legal teams and law offices without replacing licensed legal advice.",
    idealFor:
      "Law offices, legal departments, and legal professionals with recurring administrative workloads.",
    details:
      "Organized assistance with files, deadlines, intake, correspondence, templates, and case-support administration.",
    outcomes: [
      "Better-organized case administration",
      "More consistent deadline tracking",
      "Faster client intake and follow-up"
    ],
    tasks: [
      "Document and file organization",
      "Calendar and deadline coordination",
      "Client intake administration",
      "Research and case-support administration",
      "Template, correspondence, and record support"
    ],
    icon: "legal"
  },
  {
    slug: "data-entry-administrative-support",
    title: "Data Entry and General Administrative Support",
    shortTitle: "Data Entry",
    description:
      "Accurate and dependable support for records, documents, spreadsheets, and recurring administrative work.",
    idealFor:
      "Teams with recurring data handling, record cleanup, document preparation, and back-office tasks.",
    details:
      "A practical option for organizations that need consistent data entry, file organization, document formatting, and database maintenance.",
    outcomes: [
      "Cleaner and more accurate records",
      "Reduced administrative backlog",
      "More consistent recurring workflows"
    ],
    tasks: [
      "Data entry and spreadsheet updates",
      "File and folder organization",
      "Document formatting",
      "Database and record cleanup",
      "Recurring administrative assistance"
    ],
    icon: "data"
  }
] as const satisfies readonly Service[];

export const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    focus: "Role clarity",
    summary:
      "We clarify the work, schedule, tools, communication, and outcomes your organization needs.",
    details: [
      "Review the responsibilities you want to delegate",
      "Define preferred working hours and communication channels",
      "Identify required software, industry knowledge, and experience",
      "Confirm the arrangement, timeline, and onboarding priorities"
    ]
  },
  {
    number: "02",
    title: "Talent Matching",
    focus: "Candidate alignment",
    summary:
      "We evaluate the role and present the strongest Virtual Assistant candidates for your requirements.",
    details: [
      "Screen profiles against the role requirements",
      "Review experience, communication, tools, and availability",
      "Present a focused shortlist instead of an overwhelming directory",
      "Coordinate the next conversation with suitable candidates"
    ]
  },
  {
    number: "03",
    title: "Onboarding Session",
    focus: "Working readiness",
    summary:
      "We align responsibilities, access, workflows, reporting, and communication before work begins.",
    details: [
      "Confirm ownership of tasks and priorities",
      "Set communication routines and escalation paths",
      "Organize tool access and process documentation",
      "Agree on early milestones and performance expectations"
    ]
  }
] as const;

export const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/va-performa-561487425",
    icon: "linkedin"
  },
  {
    name: "TikTok",
    href: "https://vm.tiktok.com/ZS9rcsJwxFVcD-sCTwg/",
    icon: "tiktok"
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bspartners.vaperforma/?hl=en",
    icon: "instagram"
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592195024928",
    icon: "facebook"
  }
] as const satisfies readonly {
  name: string;
  href: string;
  icon: SocialIconName;
}[];
