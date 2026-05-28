"use client";

import {
  ArrowUpRight,
  BadgePercent,
  BriefcaseBusiness,
  CalendarDays,
  Calculator,
  FileText,
  Gift,
  Landmark,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentType, FormEvent, SVGProps } from "react";
import { EmailCapture } from "@/components/EmailCapture";
import { calculateRescission } from "@/lib/calculateRescission";
import { currency, onlyNumbersAndDecimal } from "@/lib/formatters";
import type { CalculationResult, CalculatorForm } from "@/types/calculator";

const initialForm: CalculatorForm = {
  salary: "",
  admissionDate: "",
  dismissalDate: "",
  terminationType: "",
  noticeType: "",
  hasExpiredVacation: "",
};

type ResultItem = {
  label: string;
  value: number;
  helper: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function FieldError({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 sm:px-4 sm:py-3 sm:text-sm">
      {message}
    </div>
  );
}

function ResultMetric({ item, muted }: { item: ResultItem; muted: boolean }) {
  const Icon = item.icon;

  return (
    <div className="h-full min-w-0 rounded-lg border border-ink-200/80 bg-gradient-to-br from-white to-ink-50/60 px-3 py-4 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-panel sm:px-6 sm:py-7">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-800 sm:h-11 sm:w-11">
          <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <p className="min-w-0 text-[0.74rem] font-extrabold leading-tight text-ink-950 sm:text-[0.95rem]">
          {item.label}
        </p>
      </div>

      <div className="mt-3 sm:mt-5">
        {muted ? (
          <div className="h-6 w-20 rounded-lg bg-ink-200/70 sm:h-8 sm:w-36" />
        ) : (
          <p className="text-[0.95rem] font-black leading-tight text-ink-950 sm:text-2xl">{currency(item.value)}</p>
        )}
        <p className="mt-1.5 text-[0.64rem] font-medium leading-4 text-ink-600 sm:mt-3 sm:text-xs sm:leading-5">
          {item.helper}
        </p>
      </div>
    </div>
  );
}

export function CalculatorSection() {
  const [form, setForm] = useState<CalculatorForm>(initialForm);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resultItems = useMemo<ResultItem[]>(
    () => [
      {
        label: "Saldo de Salário",
        value: result?.salaryBalance ?? 0,
        helper: result ? `${result.daysWorkedInMonth} dias trabalhados no mês` : "Dias trabalhados no mês",
        icon: WalletCards,
      },
      {
        label: "Férias + 1/3",
        value: result?.vacation ?? 0,
        helper: result ? "Proporcionais, adquiridas e vencidas" : "Férias proporcionais e vencidas",
        icon: CalendarDays,
      },
      {
        label: "13º Proporcional",
        value: result?.thirteenth ?? 0,
        helper: result ? `${result.proportionalMonths} meses considerados no ano` : "Meses trabalhados no ano",
        icon: Gift,
      },
      {
        label: "FGTS",
        value: result?.fgts ?? 0,
        helper: result
          ? result.fgts > 0
            ? "Saque estimado disponível"
            : "Sem saque nesta modalidade"
          : "Saque estimado do fundo",
        icon: Landmark,
      },
      {
        label: "Multa de 40%",
        value: result?.fgtsFine ?? 0,
        helper: "Sobre o saldo estimado do FGTS",
        icon: BadgePercent,
      },
      {
        label: "Aviso Prévio",
        value: result?.notice ?? 0,
        helper: result?.noticeDays
          ? result.noticeIsDiscount
            ? `${result.noticeDays} dias descontados`
            : `${result.noticeDays} dias indenizados`
          : "Sem verba extra",
        icon: FileText,
      },
    ],
    [result],
  );

  function updateField<Field extends keyof CalculatorForm>(field: Field, value: CalculatorForm[Field]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      const nextResult = calculateRescission({
        ...form,
        salary: onlyNumbersAndDecimal(form.salary),
      });
      setResult(nextResult);
    } catch (calculationError) {
      setResult(null);
      setError(calculationError instanceof Error ? calculationError.message : "Não foi possível simular agora.");
    }
  }

  return (
    <section
      className="bg-[radial-gradient(circle_at_15%_0%,#f4fbf8_0,#fafdfc_46%,#fbfdfd_100%)] pb-3 pt-3 sm:pb-9 sm:pt-6"
      id="calculadora"
    >
      <div className="container-page grid gap-2.5 sm:gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-stretch">
        <div className="grid gap-2.5 sm:gap-5">
          <form
            className="panel border-t-[3px] border-t-brand-800 p-4 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft sm:border-t-4 sm:p-7"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex items-center gap-3 sm:mb-7">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-100 text-brand-800 sm:h-10 sm:w-10">
                <Calculator aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <h2 className="text-lg font-black text-ink-950 sm:text-xl">Calculadora de Rescisão</h2>
            </div>

            <div className="grid gap-3.5 sm:gap-5">
              <label className="grid gap-2">
                <span className="field-label">Salário Bruto (R$)</span>
                <input
                  className="field-control"
                  inputMode="decimal"
                  onChange={(event) => updateField("salary", event.target.value)}
                  placeholder="Ex: 3500.00"
                  type="text"
                  value={form.salary}
                />
              </label>

              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                <label className="grid gap-2">
                  <span className="field-label">Data de Admissão</span>
                  <input
                    className="field-control"
                    onChange={(event) => updateField("admissionDate", event.target.value)}
                    type="date"
                    value={form.admissionDate}
                  />
                </label>

                <label className="grid gap-2">
                  <span className="field-label">Data de Desligamento</span>
                  <input
                    className="field-control"
                    onChange={(event) => updateField("dismissalDate", event.target.value)}
                    type="date"
                    value={form.dismissalDate}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                <label className="grid gap-2">
                  <span className="field-label">Tipo de Rescisão</span>
                  <select
                    className="field-control"
                    onChange={(event) =>
                      updateField("terminationType", event.target.value as CalculatorForm["terminationType"])
                    }
                    value={form.terminationType}
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="sem-justa-causa">Demissão sem justa causa</option>
                    <option value="pedido-demissao">Pedido de demissão</option>
                    <option value="justa-causa">Demissão por justa causa</option>
                    <option value="termino-contrato">Término de contrato</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="field-label">Aviso Prévio</span>
                  <select
                    className="field-control"
                    onChange={(event) => updateField("noticeType", event.target.value as CalculatorForm["noticeType"])}
                    value={form.noticeType}
                  >
                    <option value="">Selecione</option>
                    <option value="indenizado">Indenizado</option>
                    <option value="trabalhado">Trabalhado</option>
                    <option value="dispensado">Dispensado</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2 sm:max-w-xs">
                <span className="field-label">Férias Vencidas</span>
                <select
                  className="field-control"
                  onChange={(event) =>
                    updateField("hasExpiredVacation", event.target.value as CalculatorForm["hasExpiredVacation"])
                  }
                  value={form.hasExpiredVacation}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </label>

              <FieldError message={error} />

              <button
                className="mt-0.5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-800 px-4 text-sm font-black text-white shadow-lg shadow-brand-900/15 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-brand-900/25 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-brand-200 sm:mt-1 sm:h-12 sm:gap-3 sm:px-5 sm:text-base"
                type="submit"
              >
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
                Simular Rescisão
              </button>
            </div>
          </form>

          <div className="hidden lg:block">
            <EmailCapture />
          </div>
        </div>

        <div
          className="panel flex h-full flex-col border-t-[3px] border-t-brand-700 p-4 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft sm:border-t-4 sm:p-7"
          aria-live="polite"
        >
          <div className="mb-4 flex items-center gap-3 sm:mb-8">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-100 text-brand-800 sm:h-10 sm:w-10">
              <BriefcaseBusiness aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <h2 className="text-lg font-black text-ink-950 sm:text-xl">Resultado da Simulação</h2>
          </div>

          <div className="rounded-lg bg-[linear-gradient(135deg,#063f43_0%,#0b5f5e_52%,#3a8f72_100%)] p-4 text-white shadow-[0_22px_60px_rgba(7,83,90,0.16)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(7,83,90,0.20)] sm:p-7">
            <div className="flex items-center gap-2 text-xs font-extrabold sm:text-sm">
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-brand-100 sm:h-5 sm:w-5" />
              Valor Total Estimado
            </div>
            {result ? (
              <p className="mt-2.5 text-2xl font-black sm:mt-4 sm:text-4xl">{currency(result.total)}</p>
            ) : (
              <div className="mt-3 h-8 w-36 rounded-lg bg-white/25 sm:mt-5 sm:h-11 sm:w-52" />
            )}
          </div>

          <div className="mt-3 grid flex-1 grid-cols-2 gap-2.5 sm:mt-5 sm:gap-4 lg:auto-rows-fr">
            {resultItems.map((item) => (
              <ResultMetric item={item} key={item.label} muted={!result} />
            ))}
          </div>

          <div className="mt-3 flex items-start justify-center gap-1.5 text-center text-[0.68rem] font-medium text-ink-600 sm:mt-6 sm:gap-2 sm:text-xs">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-800 sm:h-4 sm:w-4" />
            {result
              ? "Estimativa inclui FGTS apenas quando houver direito de saque."
              : "Preencha o formulário para simular sua rescisão"}
          </div>
        </div>

        <div className="lg:hidden">
          <EmailCapture />
        </div>
      </div>
    </section>
  );
}
