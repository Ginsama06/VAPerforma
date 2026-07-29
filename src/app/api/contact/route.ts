import { Resend } from "resend";
import { createDiscoveryCall } from "@/lib/googleCalendar";
import { services } from "@/data/site";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 65_000;
const MIN_FORM_COMPLETION_MS = 1_500;
const DISCOVERY_CALL_DURATION_MS = 15 * 60 * 1000;
const DEFAULT_MIN_NOTICE_HOURS = 2;
const DEFAULT_MAX_DAYS_AHEAD = 90;
const DEFAULT_BUSINESS_TIME_ZONE = "Asia/Manila";

const allowedServices = new Set([
  ...services.map((service) => service.title),
  "Help me determine the right service"
]);

const allowedArrangements = new Set([
  "Part-time",
  "Full-time",
  "Project-based",
  "Hourly support",
  "Not sure yet"
]);

const allowedReferralSources = new Set([
  "Google search",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "TikTok",
  "Professional referral",
  "Business event",
  "Other"
]);

type ClientInquiry = {
  fullName?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  service?: unknown;
  arrangement?: unknown;
  startDate?: unknown;
  budget?: unknown;
  scheduleDiscoveryCall?: unknown;
  discoveryCallDate?: unknown;
  discoveryCallTime?: unknown;
  discoveryCallTimeZone?: unknown;
  requirements?: unknown;
  referralSource?: unknown;
  website?: unknown;
  formStartedAt?: unknown;
  consent?: unknown;
};

type DateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function json(
  body: Record<string, unknown>,
  status = 200
) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  });
}

function getText(value: unknown, maxLength: number): string {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validRequiredDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

  const [year, month, day] = date.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function validTime(time: string): boolean {
  return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time);
}

function validTimeZone(timeZone: string): boolean {
  if (!timeZone || timeZone.length > 100) return false;

  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

function getPositiveNumber(
  value: string | undefined,
  fallback: number
): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getPartsInTimeZone(
  date: Date,
  timeZone: string
): DateParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });

  const values = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)])
  );

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second
  };
}

function partsAsUtc(parts: DateParts): number {
  return Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
}

function localDateTimeToUtc(
  dateText: string,
  timeText: string,
  timeZone: string
): Date | null {
  if (
    !validRequiredDate(dateText) ||
    !validTime(timeText) ||
    !validTimeZone(timeZone)
  ) {
    return null;
  }

  const [year, month, day] = dateText.split("-").map(Number);
  const [hour, minute] = timeText.split(":").map(Number);
  const targetParts: DateParts = {
    year,
    month,
    day,
    hour,
    minute,
    second: 0
  };
  const targetAsUtc = partsAsUtc(targetParts);

  let candidateMs = targetAsUtc;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const displayedParts = getPartsInTimeZone(
      new Date(candidateMs),
      timeZone
    );
    const offsetMs = partsAsUtc(displayedParts) - candidateMs;
    const nextCandidate = targetAsUtc - offsetMs;

    if (nextCandidate === candidateMs) break;
    candidateMs = nextCandidate;
  }

  const candidate = new Date(candidateMs);
  const verified = getPartsInTimeZone(candidate, timeZone);

  if (
    verified.year !== year ||
    verified.month !== month ||
    verified.day !== day ||
    verified.hour !== hour ||
    verified.minute !== minute
  ) {
    return null;
  }

  return candidate;
}

function parseDiscoveryCallStart(
  dateText: string,
  timeText: string,
  timeZone: string
): Date | null {
  const parsed = localDateTimeToUtc(
    dateText,
    timeText,
    timeZone
  );

  if (!parsed) return null;

  const minNoticeHours = getPositiveNumber(
    process.env.DISCOVERY_CALL_MIN_NOTICE_HOURS,
    DEFAULT_MIN_NOTICE_HOURS
  );
  const maxDaysAhead = getPositiveNumber(
    process.env.DISCOVERY_CALL_MAX_DAYS_AHEAD,
    DEFAULT_MAX_DAYS_AHEAD
  );
  const now = Date.now();
  const startMs = parsed.getTime();

  if (
    startMs < now + minNoticeHours * 60 * 60 * 1000 ||
    startMs > now + maxDaysAhead * 24 * 60 * 60 * 1000
  ) {
    return null;
  }

  return parsed;
}

function formatInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone
  }).format(date);
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").trim();
}

function isSuspiciousTiming(value: string): boolean {
  const startedAt = Number(value);
  if (!Number.isFinite(startedAt) || startedAt <= 0) return true;

  const elapsed = Date.now() - startedAt;
  return elapsed < MIN_FORM_COMPLETION_MS;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return json(
        {
          success: false,
          message: "Unsupported request format."
        },
        415
      );
    }

    const contentLength = Number(
      request.headers.get("content-length") || "0"
    );

    if (
      Number.isFinite(contentLength) &&
      contentLength > MAX_REQUEST_BYTES
    ) {
      return json(
        {
          success: false,
          message:
            "The inquiry is too large. Please shorten the details."
        },
        413
      );
    }

    if (request.headers.get("sec-fetch-site") === "cross-site") {
      return json(
        {
          success: false,
          message: "This request could not be verified."
        },
        403
      );
    }

    const body = (await request.json()) as ClientInquiry;

    const honeypot = getText(body.website, 200);
    const formStartedAt = getText(body.formStartedAt, 30);

    if (honeypot || isSuspiciousTiming(formStartedAt)) {
      return json({ success: true });
    }

    const fullName = getText(body.fullName, 100);
    const email = getText(body.email, 160);
    const company = getText(body.company, 150);
    const phone = getText(body.phone, 40);
    const service = getText(body.service, 120);
    const arrangement = getText(body.arrangement, 100);
    const startDate = getText(body.startDate, 30);
    const budget = getText(body.budget, 80);
    const scheduleDiscoveryCall =
      getText(body.scheduleDiscoveryCall, 10) === "yes";
    const discoveryCallDate = getText(
      body.discoveryCallDate,
      30
    );
    const discoveryCallTime = getText(
      body.discoveryCallTime,
      20
    );
    const discoveryCallTimeZone = getText(
      body.discoveryCallTimeZone,
      100
    );
    const requirements = getText(body.requirements, 5000);
    const referralSource = getText(
      body.referralSource,
      100
    );
    const consent = getText(body.consent, 10);

    if (
      fullName.length < 2 ||
      !validEmail(email) ||
      company.length < 2 ||
      phone.length < 7 ||
      !allowedServices.has(service) ||
      !allowedArrangements.has(arrangement) ||
      !validRequiredDate(startDate) ||
      !allowedReferralSources.has(referralSource) ||
      requirements.length < 20 ||
      consent !== "yes"
    ) {
      return json(
        {
          success: false,
          message: "Please complete all required inquiry fields."
        },
        400
      );
    }

    let discoveryCallStart: Date | null = null;

    if (scheduleDiscoveryCall) {
      discoveryCallStart = parseDiscoveryCallStart(
        discoveryCallDate,
        discoveryCallTime,
        discoveryCallTimeZone
      );

      if (!discoveryCallStart) {
        return json(
          {
            success: false,
            message:
              "Choose a valid Discovery Call date, time, and timezone at least two hours from now."
          },
          400
        );
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const businessEmail = process.env.BUSINESS_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !businessEmail || !fromEmail) {
      console.error(
        "Missing VA Performa email environment variables."
      );
      return json(
        {
          success: false,
          message:
            "Email delivery is not configured yet. Please contact VA Performa directly."
        },
        500
      );
    }

    const submissionId = crypto.randomUUID();
    const submittedAt = new Date().toISOString();
    const businessTimeZone =
      process.env.BUSINESS_TIME_ZONE?.trim() ||
      DEFAULT_BUSINESS_TIME_ZONE;

    let calendarReservation:
      | Awaited<ReturnType<typeof createDiscoveryCall>>
      | null = null;
    let clientLocalTime = "";
    let businessLocalTime = "";

    if (scheduleDiscoveryCall && discoveryCallStart) {
      const discoveryCallEnd = new Date(
        discoveryCallStart.getTime() +
          DISCOVERY_CALL_DURATION_MS
      );
      clientLocalTime = formatInTimeZone(
        discoveryCallStart,
        discoveryCallTimeZone
      );
      businessLocalTime = formatInTimeZone(
        discoveryCallStart,
        businessTimeZone
      );

      try {
        calendarReservation = await createDiscoveryCall({
          submissionId,
          fullName,
          email,
          company,
          phone,
          service,
          arrangement,
          requirements,
          start: discoveryCallStart,
          end: discoveryCallEnd,
          clientTimeZone: discoveryCallTimeZone,
          clientLocalTime,
          businessLocalTime
        });
      } catch (error) {
        console.error(
          "Discovery Call calendar creation failed:",
          error instanceof Error
            ? error.message
            : "Unknown error"
        );
        return json(
          {
            success: false,
            message:
              "The Discovery Call calendar is temporarily unavailable. Turn off the optional Discovery Call to send the inquiry without scheduling, or try again shortly."
          },
          502
        );
      }
    }

    const resend = new Resend(apiKey);
    const safeRequirements = escapeHtml(requirements).replaceAll(
      "\n",
      "<br />"
    );
    const calendarLink =
      calendarReservation?.eventLink || "";
    const emailHeading = scheduleDiscoveryCall
      ? "UNCLAIMED Discovery Call received"
      : "New client inquiry";
    const subject = scheduleDiscoveryCall
      ? `UNCLAIMED Discovery Call — ${sanitizeHeader(fullName)} — ${sanitizeHeader(service)}`
      : `New client inquiry — ${sanitizeHeader(fullName)} — ${sanitizeHeader(service)}`;

    const calendarText = scheduleDiscoveryCall
      ? [
          "Discovery Call status: UNCLAIMED",
          `Calendar event ID: ${calendarReservation?.eventId || ""}`,
          calendarLink
            ? `Calendar event: ${calendarLink}`
            : "",
          "",
          "Discovery Call duration: 15 minutes",
          `Client local time: ${clientLocalTime}`,
          `Client timezone: ${discoveryCallTimeZone}`,
          `Business local time: ${businessLocalTime}`,
          `Business timezone: ${businessTimeZone}`,
          "",
          "Staff action: Open the shared Calendar and replace UNCLAIMED in the event title with CLAIMED BY [STAFF NAME].",
          ""
        ]
      : [
          "Discovery Call: Not scheduled",
          "Staff may contact the client to arrange a time later.",
          ""
        ];

    const calendarHtml = scheduleDiscoveryCall
      ? `
        <div style="background:#effaf6;border:1px solid #b7e4d9;border-radius:16px;padding:18px;margin-bottom:22px">
          <p style="margin:0 0 7px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0b7472">UNCLAIMED — 15-minute Discovery Call</p>
          <p style="margin:0;font-size:18px;font-weight:800">${escapeHtml(businessLocalTime)}</p>
          <p style="margin:7px 0 0;color:#587074">Client time: ${escapeHtml(clientLocalTime)} (${escapeHtml(discoveryCallTimeZone)})</p>
          <p style="margin:9px 0 0;color:#587074">To claim: change UNCLAIMED in the Calendar event title to CLAIMED BY [STAFF NAME].</p>
          ${
            calendarLink
              ? `<p style="margin:13px 0 0"><a href="${escapeHtml(calendarLink)}" style="color:#0b7472;font-weight:700">Open Google Calendar event</a></p>`
              : ""
          }
        </div>
      `
      : `
        <div style="background:#f4fbf8;border:1px solid #d7ece6;border-radius:16px;padding:18px;margin-bottom:22px">
          <p style="margin:0 0 7px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0b7472">Discovery Call</p>
          <p style="margin:0;color:#587074">Not scheduled. Contact the client to arrange a time later.</p>
        </div>
      `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [businessEmail],
      replyTo: email,
      subject,
      text: [
        scheduleDiscoveryCall
          ? "New VA Performa inquiry with an UNCLAIMED Discovery Call"
          : "New VA Performa client inquiry",
        `Submission ID: ${submissionId}`,
        `Submitted: ${submittedAt}`,
        "",
        ...calendarText,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Telephone: ${phone}`,
        `Service: ${service}`,
        `Arrangement: ${arrangement}`,
        `Preferred start date: ${startDate}`,
        `Estimated monthly budget (optional): ${budget || "Not specified"}`,
        `Referral source: ${referralSource}`,
        "",
        "Responsibilities and required skills:",
        requirements
      ].filter(Boolean).join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#092b30">
          <div style="background:linear-gradient(135deg,#159b98,#72d28c,#dce45a);color:#092b30;padding:26px;border-radius:18px 18px 0 0">
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">VA Performa website</p>
            <h1 style="margin:0;font-size:25px">${emailHeading}</h1>
          </div>
          <div style="border:1px solid #d7ece6;border-top:0;padding:26px;border-radius:0 0 18px 18px">
            ${calendarHtml}
            <p style="margin-top:0;color:#587074;font-size:13px">
              Submission ID: ${escapeHtml(submissionId)}<br />
              Submitted: ${escapeHtml(submittedAt)}
            </p>
            <table style="width:100%;border-collapse:collapse">
              <tbody>
                <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Name</td><td style="padding:8px 0">${escapeHtml(fullName)}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Email</td><td style="padding:8px 0">${escapeHtml(email)}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Company</td><td style="padding:8px 0">${escapeHtml(company)}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Telephone</td><td style="padding:8px 0">${escapeHtml(phone)}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Service</td><td style="padding:8px 0">${escapeHtml(service)}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Arrangement</td><td style="padding:8px 0">${escapeHtml(arrangement)}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Preferred start date</td><td style="padding:8px 0">${escapeHtml(startDate)}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Estimated budget</td><td style="padding:8px 0">${escapeHtml(budget || "Not specified")}</td></tr>
                <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Referral source</td><td style="padding:8px 0">${escapeHtml(referralSource)}</td></tr>
              </tbody>
            </table>
            <h2 style="margin:26px 0 10px;font-size:18px">Responsibilities and required skills</h2>
            <div style="line-height:1.75;background:#f4fbf8;border:1px solid #d7ece6;border-radius:14px;padding:18px">${safeRequirements}</div>
            <p style="margin:22px 0 0;color:#587074;font-size:13px">
              Reply to this email to contact the client.
            </p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error("Resend delivery failed:", error.name);
      return json(
        {
          success: false,
          message: scheduleDiscoveryCall
            ? "The Calendar event was created, but the notification email could not be delivered. Please contact VA Performa directly before submitting again."
            : "The inquiry could not be delivered. Please contact VA Performa directly."
        },
        502
      );
    }

    return json({
      success: true,
      discoveryCallScheduled: scheduleDiscoveryCall
    });
  } catch {
    return json(
      {
        success: false,
        message: "Invalid request. Please try again."
      },
      400
    );
  }
}
