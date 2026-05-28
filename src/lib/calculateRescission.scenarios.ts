import { calculateRescission } from "@/lib/calculateRescission";
import type { CalculationResult, CalculatorForm } from "@/types/calculator";

type ExpectedResult = Partial<Pick<
  CalculationResult,
  "total" | "salaryBalance" | "vacation" | "thirteenth" | "fgts" | "fgtsFine" | "notice" | "noticeDays"
>>;

export type CalculatorScenario = {
  id: string;
  description: string;
  form: CalculatorForm;
  expected: ExpectedResult;
};

export const calculatorScenarios: CalculatorScenario[] = [
  {
    id: "sem-justa-causa-um-ano-completo-virada-ano",
    description: "Sem justa causa após 12 meses completos, validando férias adquiridas e 13º na virada do ano.",
    form: {
      salary: "3000",
      admissionDate: "2024-01-01",
      dismissalDate: "2025-01-01",
      terminationType: "sem-justa-causa",
      noticeType: "indenizado",
      hasExpiredVacation: "nao",
    },
    expected: {
      salaryBalance: 100,
      vacation: 4000,
      thirteenth: 3000,
      fgts: 2880,
      fgtsFine: 1152,
      notice: 3300,
      noticeDays: 33,
      total: 14432,
    },
  },
  {
    id: "sem-justa-causa-aviso-indenizado",
    description: "Demissão sem justa causa com saque FGTS, multa de 40% e aviso indenizado.",
    form: {
      salary: "3000",
      admissionDate: "2024-01-01",
      dismissalDate: "2024-06-20",
      terminationType: "sem-justa-causa",
      noticeType: "indenizado",
      hasExpiredVacation: "nao",
    },
    expected: {
      salaryBalance: 2000,
      vacation: 2000,
      thirteenth: 1500,
      fgts: 1440,
      fgtsFine: 576,
      notice: 3000,
      noticeDays: 30,
      total: 10516,
    },
  },
  {
    id: "pedido-demissao-aviso-descontado",
    description: "Pedido de demissão sem saque FGTS, sem multa de 40% e com desconto do aviso não cumprido.",
    form: {
      salary: "3000",
      admissionDate: "2024-01-01",
      dismissalDate: "2024-06-20",
      terminationType: "pedido-demissao",
      noticeType: "indenizado",
      hasExpiredVacation: "nao",
    },
    expected: {
      salaryBalance: 2000,
      vacation: 2000,
      thirteenth: 1500,
      fgts: 0,
      fgtsFine: 0,
      notice: -3000,
      noticeDays: 30,
      total: 2500,
    },
  },
  {
    id: "justa-causa-com-ferias-vencidas",
    description: "Justa causa preservando saldo de salário e férias vencidas, sem verbas proporcionais.",
    form: {
      salary: "3000",
      admissionDate: "2024-01-01",
      dismissalDate: "2024-06-20",
      terminationType: "justa-causa",
      noticeType: "indenizado",
      hasExpiredVacation: "sim",
    },
    expected: {
      salaryBalance: 2000,
      vacation: 4000,
      thirteenth: 0,
      fgts: 0,
      fgtsFine: 0,
      notice: 0,
      noticeDays: 0,
      total: 6000,
    },
  },
  {
    id: "sem-justa-causa-aviso-trabalhado-ferias-vencidas",
    description: "Sem justa causa com aviso trabalhado, férias vencidas e sem verba extra de aviso.",
    form: {
      salary: "3000",
      admissionDate: "2023-01-01",
      dismissalDate: "2024-06-20",
      terminationType: "sem-justa-causa",
      noticeType: "trabalhado",
      hasExpiredVacation: "sim",
    },
    expected: {
      salaryBalance: 2000,
      vacation: 6000,
      thirteenth: 1500,
      fgts: 4320,
      fgtsFine: 1728,
      notice: 0,
      noticeDays: 0,
      total: 15548,
    },
  },
];

export function validateCalculatorScenarios() {
  return calculatorScenarios.map((scenario) => {
    const actual = calculateRescission(scenario.form);
    const mismatches = Object.entries(scenario.expected).filter(([key, expectedValue]) => {
      const actualValue = actual[key as keyof ExpectedResult];
      return Math.abs(Number(actualValue) - Number(expectedValue)) > 0.01;
    });

    return {
      id: scenario.id,
      passed: mismatches.length === 0,
      mismatches,
      actual,
      expected: scenario.expected,
    };
  });
}
