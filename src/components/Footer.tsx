import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-[#f7fbfb] py-3 sm:py-8">
      <div className="container-page">
        <div className="flex flex-col gap-2.5 border-b border-ink-200 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-8">
          <div>
            <Logo />
            <p className="hidden text-xs text-ink-600 sm:mt-3 sm:block sm:text-sm">
              Calculadora de rescisão trabalhista online
            </p>
          </div>

          <nav aria-label="Links do rodapé" className="flex flex-wrap gap-3 text-xs font-semibold text-ink-700 sm:gap-5 sm:text-sm">
            <a className="transition hover:text-brand-700" href="#calculadora">
              Rescisão
            </a>
            <a className="transition hover:text-brand-700" href="#como-funciona">
              Como calculamos
            </a>
            <a className="transition hover:text-brand-700" href="#faq">
              FAQ
            </a>
          </nav>
        </div>

        <div className="pt-2 text-center text-[0.66rem] leading-4 text-ink-600 sm:pt-6 sm:text-xs sm:leading-6">
          <p>© 2026 Meu Cálculo Trabalhista. Todos os direitos reservados.</p>
          <p className="hidden sm:block">Os cálculos apresentados são estimativas e não substituem a orientação de um profissional.</p>
        </div>
      </div>
    </footer>
  );
}
