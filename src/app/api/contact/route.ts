import { Resend } from "resend";

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
  consent?: unknown;
};

function getText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ClientInquiry;

    if (getText(body.website, 200)) {
      return Response.json({ success: true });
    }

    const fullName = getText(body.fullName, 100);
    const email = getText(body.email, 160);
    const company = getText(body.company, 150);
    const phone = getText(body.phone, 40);
    const service = getText(body.service, 100);
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
      !service ||
      !arrangement ||
      requirements.length < 20 ||
      consent !== "yes"
    ) {
      return Response.json(
        { success: false, message: "Please complete all required fields with valid information." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const businessEmail = process.env.BUSINESS_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !businessEmail || !fromEmail) {
      console.error("Missing email environment variables.");
      return Response.json(
        {
          success: false,
          message:
            "Email delivery is not configured yet. Please contact VAPerforma directly."
        },
        { status: 500 }
      );
    }

    // Create the Resend client only when this endpoint receives a request.
    // This prevents Next.js production builds from failing when environment
    // variables have not been configured yet.
    const resend = new Resend(apiKey);

    const safeRequirements = escapeHtml(requirements).replaceAll("\n", "<br />");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [businessEmail],
      replyTo: email,
      subject: `New VAPerforma client inquiry — ${company}`,
      text: [
        "New VAPerforma client inquiry",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Telephone: ${phone || "Not provided"}`,
        `Service: ${service}`,
        `Arrangement: ${arrangement}`,
        `Preferred start date: ${startDate || "Not specified"}`,
        `Estimated budget: ${budget || "Not specified"}`,
        `Referral source: ${referralSource || "Not specified"}`,
        "",
        "Responsibilities and required skills:",
        requirements
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#152033">
          <div style="background:#0b1d33;color:#fff;padding:24px;border-radius:16px 16px 0 0">
            <h1 style="margin:0;font-size:24px">New VAPerforma client inquiry</h1>
          </div>
          <div style="border:1px solid #dce4ee;border-top:0;padding:24px;border-radius:0 0 16px 16px">
            <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Company:</strong> ${escapeHtml(company)}</p>
            <p><strong>Telephone:</strong> ${escapeHtml(phone || "Not provided")}</p>
            <p><strong>Service:</strong> ${escapeHtml(service)}</p>
            <p><strong>Arrangement:</strong> ${escapeHtml(arrangement)}</p>
            <p><strong>Preferred start date:</strong> ${escapeHtml(startDate || "Not specified")}</p>
            <p><strong>Estimated budget:</strong> ${escapeHtml(budget || "Not specified")}</p>
            <p><strong>Referral source:</strong> ${escapeHtml(referralSource || "Not specified")}</p>
            <h2 style="margin-top:24px;font-size:18px">Responsibilities and required skills</h2>
            <p style="line-height:1.7">${safeRequirements}</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error(error);
      return Response.json(
        { success: false, message: "Your inquiry could not be delivered. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, message: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
