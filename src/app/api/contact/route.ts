import { Resend } from "resend";
import { services } from "@/data/site";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 65_000;
const MIN_FORM_COMPLETION_MS = 1_500;
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
  requirements?: unknown;
  referralSource?: unknown;
  website?: unknown;
  formStartedAt?: unknown;
  consent?: unknown;
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

  const parsed = new Date(`${date}T00:00:00`);
  return !Number.isNaN(parsed.getTime());
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
          message: "The inquiry is too large. Please shorten the details."
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
      // Return a neutral success response so basic bots do not learn
      // which anti-spam check rejected the submission.
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
    const requirements = getText(body.requirements, 5000);
    const referralSource = getText(body.referralSource, 100);
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
          message:
            "Please complete all required fields with valid information."
        },
        400
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const businessEmail = process.env.BUSINESS_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !businessEmail || !fromEmail) {
      console.error("Missing VAPerforma email environment variables.");
      return json(
        {
          success: false,
          message:
            "Email delivery is not configured yet. Please contact VAPerforma directly."
        },
        500
      );
    }

    const resend = new Resend(apiKey);
    const submissionId = crypto.randomUUID();
    const submittedAt = new Date().toISOString();
    const safeRequirements = escapeHtml(requirements).replaceAll(
      "\n",
      "<br />"
    );

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [businessEmail],
      replyTo: email,
      subject: `New VAPerforma inquiry — ${sanitizeHeader(service)}`,
      text: [
        "New VAPerforma client inquiry",
        `Submission ID: ${submissionId}`,
        `Submitted: ${submittedAt}`,
        "",
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
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#092b30">
          <div style="background:linear-gradient(135deg,#159b98,#72d28c,#dce45a);color:#092b30;padding:26px;border-radius:18px 18px 0 0">
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">VAPerforma website</p>
            <h1 style="margin:0;font-size:25px">New client inquiry</h1>
          </div>
          <div style="border:1px solid #d7ece6;border-top:0;padding:26px;border-radius:0 0 18px 18px">
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
              Reply to this email to respond directly to the client.
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
          message:
            "Your inquiry could not be delivered. Please try again."
        },
        502
      );
    }

    return json({ success: true });
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
