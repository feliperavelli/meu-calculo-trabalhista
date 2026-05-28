import { Calculator, CheckCircle2, ClipboardList, CreditCard } from "lucide-react";

const steps = [
  {
    title: "1. Informe seus dados",
    description: "Informe salário, datas e tipo de rescisão.",
    icon: ClipboardList,
  },
  {
    title: "2. Cálculo automático",
    description: "Calculamos as verbas principais automaticamente.",
    icon: Calculator,
  },
  {
    title: "3. Veja o detalhamento",
    description: "Veja saldo, férias, 13º, FGTS, multa e aviso.",
    icon: CreditCard,
  },
  {
    title: "4. Confira o total",
    description: "Confira uma estimativa clara do total.",
    icon: CheckCircle2,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#f5faf9] py-6 sm:py-16" id="como-funciona">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-black text-ink-950 sm:text-4xl">Como calculamos</h2>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-5 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                className="rounded-lg border border-ink-200/80 bg-white p-3 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-soft sm:p-6"
                key={step.title}
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-100 text-brand-800 sm:h-11 sm:w-11">
                  <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <h3 className="mt-2.5 text-[0.74rem] font-black leading-tight text-ink-950 sm:mt-6 sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.66rem] leading-4 text-ink-700 sm:mt-3 sm:text-sm sm:leading-6">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
