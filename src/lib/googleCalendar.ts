import { createSign } from "node:crypto";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3";
const CALENDAR_SCOPES =
  "https://www.googleapis.com/auth/calendar.events";

let cachedAccessToken = "";
let cachedAccessTokenExpiresAt = 0;

type DiscoveryCallBooking = {
  submissionId: string;
  fullName: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  arrangement: string;
  requirements: string;
  start: Date;
  end: Date;
  clientTimeZone: string;
  clientLocalTime: string;
  businessLocalTime: string;
};

export type CalendarReservation = {
  success: true;
  eventId: string;
  eventLink: string;
};

function encodeBase64Url(value: string | Buffer): string {
  return Buffer.from(value)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function normalizePrivateKey(value: string): string {
  const trimmed = value.trim();
  const unquoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1)
      : trimmed;

  return unquoted.replaceAll("\\n", "\n");
}

function getCalendarConfiguration() {
  const serviceAccountEmail =
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() || "";
  const privateKeyValue =
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "";
  const calendarId =
    process.env.GOOGLE_CALENDAR_ID?.trim() ||
    process.env.BUSINESS_EMAIL?.trim() ||
    "";

  if (!serviceAccountEmail || !privateKeyValue || !calendarId) {
    throw new Error("Google Calendar integration is not configured.");
  }

  return {
    serviceAccountEmail,
    privateKey: normalizePrivateKey(privateKeyValue),
    calendarId
  };
}

async function getGoogleAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  if (
    cachedAccessToken &&
    cachedAccessTokenExpiresAt > now + 60
  ) {
    return cachedAccessToken;
  }

  const { serviceAccountEmail, privateKey } =
    getCalendarConfiguration();
  const header = encodeBase64Url(
    JSON.stringify({ alg: "RS256", typ: "JWT" })
  );
  const payload = encodeBase64Url(
    JSON.stringify({
      iss: serviceAccountEmail,
      scope: CALENDAR_SCOPES,
      aud: GOOGLE_TOKEN_URL,
      iat: now,
      exp: now + 3600
    })
  );
  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  const signature = signer.sign(privateKey);
  const assertion = `${unsignedToken}.${encodeBase64Url(signature)}`;

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    }),
    cache: "no-store"
  });

  const result = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !result.access_token) {
    console.error(
      "Google access-token request failed:",
      result.error || response.status,
      result.error_description || ""
    );
    throw new Error("Google Calendar authorization failed.");
  }

  cachedAccessToken = result.access_token;
  cachedAccessTokenExpiresAt =
    now + Math.max(300, result.expires_in || 3600);

  return cachedAccessToken;
}

async function googleCalendarRequest<T>(
  url: string,
  init: RequestInit
): Promise<T> {
  const accessToken = await getGoogleAccessToken();
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers || {})
    },
    cache: "no-store"
  });

  const result = (await response.json()) as T & {
    error?: {
      code?: number;
      message?: string;
      status?: string;
    };
  };

  if (!response.ok) {
    console.error(
      "Google Calendar API request failed:",
      result.error?.code || response.status,
      result.error?.status || "",
      result.error?.message || ""
    );
    throw new Error("Google Calendar request failed.");
  }

  return result;
}

export async function createDiscoveryCall(
  booking: DiscoveryCallBooking
): Promise<CalendarReservation> {
  const { calendarId } = getCalendarConfiguration();
  const timeMin = booking.start.toISOString();
  const timeMax = booking.end.toISOString();

  const event = await googleCalendarRequest<{
    id?: string;
    htmlLink?: string;
  }>(
    `${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(
      calendarId
    )}/events?sendUpdates=none`,
    {
      method: "POST",
      body: JSON.stringify({
        summary:
          `UNCLAIMED — VA Performa Discovery Call — ${booking.fullName}`,
        description: [
          "STATUS: UNCLAIMED",
          "To claim this call, replace UNCLAIMED in the event title with CLAIMED BY [STAFF NAME].",
          "",
          "15-minute VA Performa Discovery Call",
          "",
          `Submission ID: ${booking.submissionId}`,
          `Client: ${booking.fullName}`,
          `Email: ${booking.email}`,
          `Company: ${booking.company}`,
          `Telephone: ${booking.phone}`,
          `Service: ${booking.service}`,
          `Preferred arrangement: ${booking.arrangement}`,
          `Client timezone: ${booking.clientTimeZone}`,
          `Client local time: ${booking.clientLocalTime}`,
          `Business local time: ${booking.businessLocalTime}`,
          "",
          "Responsibilities and required skills:",
          booking.requirements
        ].join("\n"),
        location: "Online discovery call",
        start: { dateTime: timeMin },
        end: { dateTime: timeMax },
        visibility: "private",
        transparency: "opaque",
        reminders: { useDefault: true },
        extendedProperties: {
          private: {
            vaPerformaSubmissionId: booking.submissionId,
            clientEmail: booking.email,
            claimStatus: "unclaimed"
          }
        }
      })
    }
  );

  if (!event.id) {
    throw new Error("Google Calendar did not return an event ID.");
  }

  return {
    success: true,
    eventId: event.id,
    eventLink: event.htmlLink || ""
  };
}
