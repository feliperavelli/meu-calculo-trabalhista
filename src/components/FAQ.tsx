import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O que é rescisão trabalhista?",
    answer:
      "É o encerramento do contrato de trabalho. Nesse momento são apuradas verbas como saldo de salário, férias, 13º, FGTS, multa rescisória e aviso prévio, conforme o tipo de desligamento.",
  },
  {
    question: "Quais são os tipos de rescisão de contrato?",
    answer:
      "Os casos mais comuns são demissão sem justa causa, pedido de demissão, demissão por justa causa e término de contrato. Cada tipo altera os direitos incluídos no cálculo.",
  },
  {
    question: "O que é o aviso prévio e como funciona?",
    answer:
      "O aviso prévio pode ser trabalhado, indenizado ou dispensado. Na demissão sem justa causa, quando indenizado, ele costuma entrar como verba adicional na rescisão.",
  },
  {
    question: "Como é calculado o FGTS na rescisão?",
    answer:
      "O FGTS é estimado a partir dos depósitos mensais de 8% sobre a remuneração. Em demissão sem justa causa, também pode haver multa de 40% sobre o saldo.",
  },
  {
    question: "Tenho direito a férias mesmo sem completar 1 ano?",
    answer:
      "Em muitos desligamentos há férias proporcionais, calculadas por meses trabalhados, acrescidas de 1/3 constitucional. Em justa causa, as regras mudam.",
  },
  {
    question: "Como funciona o 13º salário na rescisão?",
    answer:
      "O 13º proporcional considera os meses trabalhados no ano do desligamento. Meses com 15 dias ou mais de trabalho geralmente entram na contagem.",
  },
  {
    question: "Os valores da calculadora são exatos?",
    answer:
      "Não. A calculadora fornece uma estimativa para planejamento. Convenções coletivas, descontos, adicionais, faltas e detalhes do contrato podem alterar o valor final.",
  },
];

export function FAQ() {
  return (
    <section className="bg-white py-8 sm:py-20" id="faq">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-black text-ink-950 sm:text-4xl">Perguntas Frequentes</h2>
          <p className="mt-3 hidden text-base leading-7 text-ink-700 sm:block">
            Tire suas dúvidas sobre rescisão trabalhista
          </p>
        </div>

        <div className="mx-auto mt-5 max-w-4xl divide-y divide-ink-200 sm:mt-10">
          {faqs.map((faq) => (
            <details
              className="group rounded-lg px-1 py-3 transition duration-200 hover:bg-ink-50/70 sm:px-3 sm:py-5"
              key={faq.question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="text-sm font-black leading-snug text-ink-950 sm:text-base">{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-ink-600 transition group-open:rotate-180 sm:h-5 sm:w-5"
                />
              </summary>
              <p className="max-w-3xl pt-2 text-xs leading-5 text-ink-700 sm:pt-3 sm:text-sm sm:leading-7">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
