import { CheckCircle2, Scale, Smartphone } from "lucide-react";

const trustItems = [
  { label: "100% gratuito", icon: CheckCircle2 },
  { label: "Atualizado pela CLT", icon: Scale },
  { label: "Funciona no celular", icon: Smartphone },
];

export function Hero() {
  return (
    <section className="border-b border-ink-100 bg-[radial-gradient(circle_at_top_left,#eef9f6_0,#fcfefd_48%,#fafdfc_100%)] py-3 sm:py-5">
      <div className="container-page">
        <div className="max-w-[22rem] sm:max-w-5xl">
          <h1 className="text-[1.48rem] font-black leading-[1.08] text-ink-950 sm:text-[2.35rem] sm:leading-tight lg:text-[3rem] lg:leading-[1.06]">
            Calcule sua rescisão trabalhista
          </h1>

          <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white/95 px-2.5 py-1.5 text-[0.68rem] font-semibold text-ink-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:text-brand-900 hover:shadow-panel sm:gap-2 sm:px-3 sm:py-2 sm:text-xs"
                  key={item.label}
                >
                  <Icon aria-hidden="true" className="h-3.5 w-3.5 text-brand-700 sm:h-4 sm:w-4" />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
