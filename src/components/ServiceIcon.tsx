import {
  CalendarIcon,
  CustomerOperationsIcon,
  DataEntryIcon,
  ExecutiveIcon,
  HealthcareIcon,
  LegalIcon,
  SocialMediaIcon,
  VideoIcon,
  WebsiteIcon
} from "@/components/Icons";

const icons = {
  executive: ExecutiveIcon,
  medical: HealthcareIcon,
  social: SocialMediaIcon,
  customer: CustomerOperationsIcon,
  calendar: CalendarIcon,
  website: WebsiteIcon,
  video: VideoIcon,
  legal: LegalIcon,
  data: DataEntryIcon
};

export default function ServiceIcon({
  name,
  className
}: {
  name: keyof typeof icons;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} />;
}
