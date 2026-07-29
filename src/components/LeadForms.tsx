"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import type {
  ChangeEvent,
  FormEvent
} from "react";
import { services } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error";

type LeadFormsProps = {
  initialService?: string;
};

function dateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function LeadForms({
  initialService = ""
}: LeadFormsProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const normalizedInitialService = services.some(
    (service) => service.title === initialService
  )
    ? initialService
    : "";

  const [selectedService, setSelectedService] = useState(
    normalizedInitialService
  );
  const [discoveryDate, setDiscoveryDate] = useState("");
  const [discoveryTime, setDiscoveryTime] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() =>
    Date.now().toString()
  );
  const [clientTimeZone] = useState(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
      return "UTC";
    }
  });
  const serviceRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const dateLimits = useMemo(() => {
    const minimum = new Date();
    const maximum = new Date();
    maximum.setDate(maximum.getDate() + 90);

    return {
      min: dateInputValue(minimum),
      max: dateInputValue(maximum)
    };
  }, []);

  const discoveryCallStartUtc = useMemo(() => {
    if (!discoveryDate || !discoveryTime) return "";

    const localDateTime = new Date(
      `${discoveryDate}T${discoveryTime}:00`
    );

    return Number.isNaN(localDateTime.getTime())
      ? ""
      : localDateTime.toISOString();
  }, [discoveryDate, discoveryTime]);

  useEffect(() => {
    if (message) {
      statusRef.current?.focus({ preventScroll: true });
    }
  }, [message]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") return;

    if (!discoveryCallStartUtc) {
      setStatus("error");
      setMessage("Please choose a valid discovery-call date and time.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25_000);

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        signal: controller.signal
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Your inquiry could not be sent.");
      }

      form.reset();
      setSelectedService("");
      setDiscoveryDate("");
      setDiscoveryTime("");
      setFormStartedAt(Date.now().toString());
      setStatus("success");
      setMessage(
        "Your inquiry was sent and your 15-minute Discovery Call was added to the VA Performa calendar."
      );

      const url = new URL(window.location.href);
      url.searchParams.delete("service");
      url.hash = "get-started";
      window.history.replaceState({}, "", url);
    } catch (error) {
      setStatus("error");

      if (error instanceof DOMException && error.name === "AbortError") {
        setMessage(
          "The request took too long. Please check your connection and try again."
        );
      } else {
        setMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <form
      onSubmit={submit}
      aria-busy={status === "sending"}
      className="form-shadow overflow-hidden rounded-[2rem] border border-[#d7ece6] bg-white p-6 sm:p-9"
    >
      <p className="form-kicker">Client inquiry</p>

      {selectedService && (
        <div
          role="status"
          className="mt-5 rounded-2xl border border-[#b7e4d9] bg-[#effaf6] px-4 py-3 text-sm font-medium text-[#0b7472]"
        >
          Selected service: {selectedService}
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="form-label">
          Full name
          <input
            className="form-field mt-2"
            name="fullName"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Enter your full name"
          />
        </label>

        <label className="form-label">
          Business email
          <input
            className="form-field mt-2"
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            inputMode="email"
            placeholder="name@company.com"
          />
        </label>

        <label className="form-label">
          Company or organization
          <input
            className="form-field mt-2"
            name="company"
            required
            minLength={2}
            maxLength={150}
            autoComplete="organization"
            placeholder="Organization name"
          />
        </label>

        <label className="form-label">
          Telephone number
          <input
            className="form-field mt-2"
            name="phone"
            type="tel"
            required
            minLength={7}
            maxLength={40}
            autoComplete="tel"
            inputMode="tel"
            placeholder="Enter a telephone number"
          />
        </label>

        <label className="form-label">
          Service needed
          <select
            ref={serviceRef}
            className="form-field mt-2"
            name="service"
            value={selectedService}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setSelectedService(event.target.value)
            }
            required
          >
            <option value="" disabled>
              Select a service
            </option>

            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}

            <option value="Help me determine the right service">
              Help me determine the right service
            </option>
          </select>
        </label>

        <label className="form-label">
          Preferred arrangement
          <select
            className="form-field mt-2"
            name="arrangement"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select an arrangement
            </option>
            <option>Part-time</option>
            <option>Full-time</option>
            <option>Project-based</option>
            <option>Hourly support</option>
            <option>Not sure yet</option>
          </select>
        </label>

        <label className="form-label">
          Preferred start date
          <input
            className="form-field mt-2"
            name="startDate"
            type="date"
            required
          />
        </label>

        <label className="form-label">
          Estimated monthly budget{" "}
          <span className="font-medium text-[#819596]">(optional)</span>
          <input
            className="form-field mt-2"
            name="budget"
            maxLength={80}
            inputMode="decimal"
            placeholder="Example: $1,000–$1,500"
          />
        </label>

        <fieldset className="discovery-scheduler sm:col-span-2">
          <legend className="px-2 text-lg font-medium text-[#092b30]">
            Schedule your 15-minute Discovery Call
          </legend>

          <p className="mt-1 text-sm leading-6 text-[#587074]">
            Choose a date and a 15-minute time slot. Times below use your
            device timezone: <strong>{clientTimeZone}</strong>.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="form-label">
              Discovery Call date
              <input
                className="form-field mt-2"
                name="discoveryCallDate"
                type="date"
                value={discoveryDate}
                min={dateLimits.min}
                max={dateLimits.max}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setDiscoveryDate(event.target.value)
                }
                required
              />
            </label>

            <label className="form-label">
              Discovery Call time
              <input
                className="form-field mt-2"
                name="discoveryCallTime"
                type="time"
                value={discoveryTime}
                step={900}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setDiscoveryTime(event.target.value)
                }
                required
              />
            </label>
          </div>

          <div className="mt-4 rounded-2xl border border-[#b7e4d9] bg-white/80 px-4 py-3 text-sm leading-6 text-[#356164]">
            The selected slot will be checked against the VA Performa business
            calendar when you submit. If another person already booked it,
            you will be asked to choose a different time.
          </div>
        </fieldset>

        <input
          type="hidden"
          name="discoveryCallStartUtc"
          value={discoveryCallStartUtc}
          readOnly
        />
        <input
          type="hidden"
          name="discoveryCallTimeZone"
          value={clientTimeZone}
          readOnly
        />

        <label className="form-label sm:col-span-2">
          Responsibilities and required skills
          <textarea
            className="form-field mt-2"
            name="requirements"
            required
            minLength={20}
            maxLength={5000}
            placeholder="Describe the role, responsibilities, tools, working hours, communication expectations, and experience required."
          />
        </label>

        <label className="form-label sm:col-span-2">
          How did you hear about VA Performa?
          <select
            className="form-field mt-2"
            name="referralSource"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            <option>Google search</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>LinkedIn</option>
            <option>TikTok</option>
            <option>Professional referral</option>
            <option>Business event</option>
            <option>Other</option>
          </select>
        </label>

        <label
          className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          Leave this field empty
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>

        <input
          type="hidden"
          name="formStartedAt"
          value={formStartedAt}
          readOnly
        />
      </div>

      <div className="mt-5 rounded-2xl border border-[#dce79a] bg-[#fbfde8] px-4 py-3 text-sm leading-6 text-[#42501b]">
        Do not include patient names, medical records, passwords, or other
        confidential information in this inquiry form.
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#587074]">
        <input
          className="mt-1 h-4 w-4 accent-[#20aaa6]"
          type="checkbox"
          name="consent"
          value="yes"
          required
        />
        <span>
          I agree to be contacted by VA Performa regarding this business
          inquiry and Discovery Call.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="brand-button mt-7 w-full rounded-2xl px-5 py-4 disabled:cursor-not-allowed disabled:opacity-65"
      >
        {status === "sending"
          ? "Checking Calendar..."
          : "Submit Inquiry & Schedule Discovery Call"}
      </button>

      {message && (
        <p
          ref={statusRef}
          role={status === "error" ? "alert" : "status"}
          tabIndex={-1}
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 outline-none ${
            status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-950"
              : "border-red-200 bg-red-50 text-red-950"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
