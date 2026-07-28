import { processSteps } from "@/data/site";
import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  MatchIcon,
  OnboardingIcon
} from "@/components/Icons";

const icons = [CalendarIcon, MatchIcon, OnboardingIcon];

export default function HowItWorks() {
  return (
    <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
      {processSteps.map((step, index) => {
        const Icon = icons[index];

        return (
          <details
            key={step.number}
            className="process-card rounded-[1.8rem] border bg-white p-7"
          >
            <summary className="process-summary">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="block text-xs font-black tracking-[0.18em] text-[#159b98]">
                    STEP {step.number}
                  </span>
                  <span className="mt-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#789092]">
                    {step.focus}
                  </span>
                </div>

                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#effaf6] text-[#159b98]">
                  <Icon className="h-6 w-6" />
                </span>
              </div>

              <h3 className="mt-8 text-3xl font-black tracking-[-0.045em] text-[#092b30]">
                {step.title}
              </h3>

              <p className="mt-4 leading-8 text-[#587074]">
                {step.summary}
              </p>

              <span className="process-details-label mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0b7472]">
                <span className="process-label-closed">View details</span>
                <span className="process-label-open">Show less</span>
                <ChevronDownIcon className="process-label-chevron h-4 w-4" />
              </span>
            </summary>

            <div className="process-detail-panel">
              <ul className="mt-6 grid gap-3 border-t border-[#d7ece6] pt-5">
                {step.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-3 text-sm font-semibold leading-6 text-[#29484b]"
                  >
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#20aaa6]" />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl border border-[#dce79a] bg-[#fbfde8] p-4">
                <p className="text-xs font-black uppercase tracking-[0.13em] text-[#667520]">
                  Result
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#42501b]">
                  {step.result}
                </p>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
