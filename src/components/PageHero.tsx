type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({
  eyebrow,
  title,
  description
}: PageHeroProps) {
  return (
    <section className="professional-hero relative overflow-hidden py-24 text-white sm:py-32">
      <div className="subtle-grid pointer-events-none absolute inset-0" />
      <div className="section-container relative">
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[1.02] tracking-[-0.055em] sm:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
