import { Calculator } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-700 text-white shadow-sm sm:h-11 sm:w-11">
        <Calculator aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.3} />
      </div>
      <div className="leading-tight">
        <p className="text-base font-extrabold text-ink-950 sm:text-[1.05rem]">Meu Cálculo</p>
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.08em] text-ink-500 sm:text-[0.68rem]">
          Trabalhista
        </p>
      </div>
    </div>
  );
}
