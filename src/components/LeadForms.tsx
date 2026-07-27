"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function LeadForms() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Your inquiry could not be sent.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thank you. Your inquiry has been sent to the VAPerforma team.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={submit}
      className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 soft-shadow sm:p-9"
    >
      <p className="eyebrow">Client inquiry</p>
      <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
        Tell us what support your organization needs.
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600">
        Share the responsibilities, schedule, tools, and experience required.
        Your inquiry will be sent directly to the VAPerforma business email.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-slate-800">
          Full name
          <input className="form-field mt-2" name="fullName" required minLength={2} maxLength={100} placeholder="Enter your full name" />
        </label>

        <label className="text-sm font-bold text-slate-800">
          Business email
          <input className="form-field mt-2" name="email" type="email" required maxLength={160} placeholder="name@company.com" />
        </label>

        <label className="text-sm font-bold text-slate-800">
          Company or organization
          <input className="form-field mt-2" name="company" required minLength={2} maxLength={150} placeholder="Organization name" />
        </label>

        <label className="text-sm font-bold text-slate-800">
          Telephone number
          <input className="form-field mt-2" name="phone" type="tel" maxLength={40} placeholder="Optional" />
        </label>

        <label className="text-sm font-bold text-slate-800">
          Service needed
          <select className="form-field mt-2" name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            <option>Executive and Administrative Assistance</option>
            <option>Medical Virtual Assistance</option>
            <option>Social Media Management</option>
            <option>Customer Support</option>
            <option>Appointment Scheduling and Reception</option>
            <option>Website Development</option>
            <option>Video Editing</option>
            <option>Legal Virtual Assistance</option>
            <option>Data Entry and General Administrative Support</option>
            <option>Help me determine the right service</option>
          </select>
        </label>

        <label className="text-sm font-bold text-slate-800">
          Preferred arrangement
          <select className="form-field mt-2" name="arrangement" defaultValue="" required>
            <option value="" disabled>Select an arrangement</option>
            <option>Part-time</option>
            <option>Full-time</option>
            <option>Project-based</option>
            <option>Hourly support</option>
            <option>Not sure yet</option>
          </select>
        </label>

        <label className="text-sm font-bold text-slate-800">
          Preferred start date
          <input className="form-field mt-2" name="startDate" type="date" />
        </label>

        <label className="text-sm font-bold text-slate-800">
          Estimated monthly budget
          <input className="form-field mt-2" name="budget" maxLength={80} placeholder="Example: $1,000–$1,500" />
        </label>

        <label className="text-sm font-bold text-slate-800 sm:col-span-2">
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

        <label className="text-sm font-bold text-slate-800 sm:col-span-2">
          How did you hear about VAPerforma?
          <select className="form-field mt-2" name="referralSource" defaultValue="">
            <option value="">Select an option</option>
            <option>Google search</option>
            <option>Social media</option>
            <option>Professional referral</option>
            <option>Business event</option>
            <option>Other</option>
          </select>
        </label>

        <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
        Do not include patient names, medical records, passwords, or other confidential information in this inquiry form.
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-600">
        <input className="mt-1 h-4 w-4 accent-blue-700" type="checkbox" name="consent" value="yes" required />
        <span>I agree to be contacted by VAPerforma regarding this business inquiry.</span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-2xl bg-blue-700 px-5 py-4 font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-65"
      >
        {status === "sending" ? "Sending Inquiry..." : "Submit Client Inquiry"}
      </button>

      {message && (
        <p
          role="status"
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 ${
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
