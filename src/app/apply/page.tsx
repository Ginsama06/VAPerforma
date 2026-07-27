import LeadForms from "@/components/LeadForms";
import PageHero from "@/components/PageHero";

export default function GetStartedPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Start the conversation"
        title="Request professional support."
        description="Tell us what your organization needs, and the VAPerforma team will review your requirements and contact you about the next step."
      />

      <section className="bg-[#f6f8fb] py-20 sm:py-24">
        <div className="section-container mx-auto max-w-5xl">
          <LeadForms />
        </div>
      </section>
    </main>
  );
}
