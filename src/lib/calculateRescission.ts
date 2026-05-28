import type { CalculationResult, CalculatorForm, NoticeType, TerminationType } from "@/types/calculator";

const FGTS_MONTHLY_RATE = 0.08;
const FGTS_FINE_RATE_WITHOUT_CAUSE = 0.4;
const VACATION_THIRD_RATE = 1 / 3;
const MIN_DAYS_FOR_PROPORTIONAL_MONTH = 15;

type TerminationRule = {
  receivesProportionalVacation: boolean;
  receivesThirteenth: boolean;
  canWithdrawFgts: boolean;
  fgtsFineRate: number;
  noticePolicy: "employer-pays" | "employee-may-discount" | "none";
};

const TERMINATION_RULES: Record<TerminationType, TerminationRule> = {
  "sem-justa-causa": {
    receivesProportionalVacation: true,
    receivesThirteenth: true,
    canWithdrawFgts: true,
    fgtsFineRate: FGTS_FINE_RATE_WITHOUT_CAUSE,
    noticePolicy: "employer-pays",
  },
  "pedido-demissao": {
    receivesProportionalVacation: true,
    receivesThirteenth: true,
    canWithdrawFgts: false,
    fgtsFineRate: 0,
    noticePolicy: "employee-may-discount",
  },
  "justa-causa": {
    receivesProportionalVacation: false,
    receivesThirteenth: false,
    canWithdrawFgts: false,
    fgtsFineRate: 0,
    noticePolicy: "none",
  },
  "termino-contrato": {
    receivesProportionalVacation: true,
    receivesThirteenth: true,
    canWithdrawFgts: true,
    fgtsFineRate: 0,
    noticePolicy: "none",
  },
};

function parseLocalDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function maxDate(first: Date, second: Date): Date {
  return first > second ? first : second;
}

function minDate(first: Date, second: Date): Date {
  return first < second ? first : second;
}

function addYears(date: Date, years: number): Date {
  return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
}

function startOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

function endOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0);
}

function nextMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

function daysBetweenInclusive(start: Date, end: Date): number {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((end.getTime() - start.getTime()) / millisecondsPerDay) + 1;
}

function fullYearsBetween(start: Date, end: Date): number {
  let years = end.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    end.getMonth() < start.getMonth() || (end.getMonth() === start.getMonth() && end.getDate() < start.getDate());

  if (beforeAnniversary) {
    years -= 1;
  }

  return Math.max(0, years);
}

function countMonthsWithAtLeast15Days(start: Date, end: Date, maxMonths = 12): number {
  let months = 0;
  let cursor = startOfMonth(start.getFullYear(), start.getMonth());

  while (cursor <= end) {
    const monthStart = maxDate(start, startOfMonth(cursor.getFullYear(), cursor.getMonth()));
    const monthEnd = minDate(end, endOfMonth(cursor.getFullYear(), cursor.getMonth()));

    if (monthEnd >= monthStart && daysBetweenInclusive(monthStart, monthEnd) >= MIN_DAYS_FOR_PROPORTIONAL_MONTH) {
      months += 1;
    }

    cursor = nextMonth(cursor);
  }

  return Math.min(maxMonths, Math.max(0, months));
}

function workedDaysInDismissalMonth(admission: Date, dismissal: Date): number {
  const start = admission.getFullYear() === dismissal.getFullYear() && admission.getMonth() === dismissal.getMonth()
    ? admission
    : startOfMonth(dismissal.getFullYear(), dismissal.getMonth());

  const days = daysBetweenInclusive(start, dismissal);
  return Math.min(30, Math.max(0, days));
}

function thirteenthMonths(admission: Date, dismissal: Date): number {
  const yearStart = new Date(dismissal.getFullYear(), 0, 1);
  const countStart = maxDate(admission, yearStart);
  const currentYearMonths = countMonthsWithAtLeast15Days(countStart, dismissal);

  if (currentYearMonths > 0) {
    return currentYearMonths;
  }

  // MVP: o 13º é anual, mas a calculadora não pergunta se o 13º do ano
  // anterior já foi pago. Para evitar um resultado artificialmente zerado em
  // desligamentos logo na virada do ano, usamos o ano anterior como referência
  // quando o ano da rescisão não possui nenhum mês com 15 dias trabalhados.
  const previousYearStart = new Date(dismissal.getFullYear() - 1, 0, 1);
  const previousYearEnd = new Date(dismissal.getFullYear() - 1, 11, 31);

  if (admission > previousYearEnd) {
    return 0;
  }

  return countMonthsWithAtLeast15Days(maxDate(admission, previousYearStart), previousYearEnd);
}

function currentVacationCycleStart(admission: Date, dismissal: Date): Date {
  return addYears(admission, fullYearsBetween(admission, dismissal));
}

function proportionalVacationMonths(admission: Date, dismissal: Date): number {
  return countMonthsWithAtLeast15Days(currentVacationCycleStart(admission, dismissal), dismissal);
}

function employerNoticeDays(completeYears: number): number {
  // Lei 12.506/2011: aviso de 30 dias, acrescido de 3 dias por ano completo,
  // limitado a 90 dias. No MVP, aplicamos a proporcionalidade somente quando
  // o empregador dispensa sem justa causa.
  return Math.min(90, 30 + Math.min(60, completeYears * 3));
}

function noticeAmount({
  dailySalary,
  noticeType,
  rule,
  completeYears,
}: {
  dailySalary: number;
  noticeType: NoticeType;
  rule: TerminationRule;
  completeYears: number;
}): { amount: number; days: number; isDiscount: boolean } {
  if (noticeType !== "indenizado" || rule.noticePolicy === "none") {
    return { amount: 0, days: 0, isDiscount: false };
  }

  if (rule.noticePolicy === "employer-pays") {
    const days = employerNoticeDays(completeYears);
    return { amount: dailySalary * days, days, isDiscount: false };
  }

  // Pedido de demissão: se o empregado não cumprir o aviso, o empregador pode
  // descontar o prazo respectivo. Mantemos 30 dias como simplificação do MVP,
  // porque a proporcionalidade é tratada como benefício do empregado.
  const days = 30;
  return { amount: dailySalary * -days, days, isDiscount: true };
}

export function calculateRescission(form: CalculatorForm): CalculationResult {
  const salary = Number(form.salary);
  const admission = parseLocalDate(form.admissionDate);
  const dismissal = parseLocalDate(form.dismissalDate);

  if (!salary || salary <= 0 || !admission || !dismissal || dismissal < admission) {
    throw new Error("Preencha salário e datas válidas para simular.");
  }

  if (!form.terminationType || !form.noticeType || !form.hasExpiredVacation) {
    throw new Error("Selecione tipo de rescisão, aviso prévio e férias vencidas.");
  }

  const terminationType = form.terminationType;
  const rule = TERMINATION_RULES[terminationType];
  const dailySalary = salary / 30;
  const daysWorkedInMonth = workedDaysInDismissalMonth(admission, dismissal);
  const workedMonths = countMonthsWithAtLeast15Days(admission, dismissal, Number.POSITIVE_INFINITY);
  const completeYears = fullYearsBetween(admission, dismissal);
  const proportionalMonths = thirteenthMonths(admission, dismissal);
  const vacationMonths = proportionalVacationMonths(admission, dismissal);

  const salaryBalance = dailySalary * daysWorkedInMonth;

  const fullVacationAmount = salary * (1 + VACATION_THIRD_RATE);

  // Período aquisitivo: a cada 12 meses de contrato, o empregado adquire um
  // novo período de férias. Se a rescisão acontece no fechamento desse ciclo,
  // o MVP trata a verba como férias adquiridas, mesmo que "férias vencidas"
  // esteja marcado como "não".
  const acquiredVacation = form.hasExpiredVacation === "nao" && completeYears > 0 ? fullVacationAmount : 0;

  // Férias vencidas: representam um período completo de férias já adquirido e
  // ainda não quitado/gozado. Como o formulário é simples, o MVP considera no
  // máximo um período vencido adicional.
  const expiredVacation = form.hasExpiredVacation === "sim" ? fullVacationAmount : 0;

  // Férias proporcionais: correspondem ao período aquisitivo em andamento após
  // o último aniversário do contrato. A regra dos 15 dias considera como 1/12
  // o mês em que houve pelo menos 15 dias trabalhados.
  const proportionalVacationBase = (salary / 12) * vacationMonths;
  const proportionalVacation = proportionalVacationBase * (1 + VACATION_THIRD_RATE);
  const vacation = acquiredVacation + expiredVacation + (rule.receivesProportionalVacation ? proportionalVacation : 0);

  // 13º proporcional: a regra dos 15 dias transforma uma fração igual ou
  // superior a 15 dias em mês integral. Por simplicidade de MVP, quando a
  // rescisão acontece nos primeiros dias do ano e ainda não há mês proporcional
  // no ano corrente, usamos o ano anterior como referência estimada.
  // Na justa causa, o MVP remove essa verba.
  const thirteenth = rule.receivesThirteenth ? (salary / 12) * proportionalMonths : 0;

  // FGTS estimado: usamos salário atual x 8% x meses calendário do vínculo.
  // O saque do saldo é exibido apenas nas modalidades que autorizam saque.
  const estimatedFgtsBalance = salary * FGTS_MONTHLY_RATE * workedMonths;
  const fgts = rule.canWithdrawFgts ? estimatedFgtsBalance : 0;
  const fgtsFine = estimatedFgtsBalance * rule.fgtsFineRate;

  const notice = noticeAmount({
    dailySalary,
    noticeType: form.noticeType,
    rule,
    completeYears,
  });

  const roundedSalaryBalance = roundMoney(salaryBalance);
  const roundedVacation = roundMoney(vacation);
  const roundedThirteenth = roundMoney(thirteenth);
  const roundedFgts = roundMoney(fgts);
  const roundedFgtsFine = roundMoney(fgtsFine);
  const roundedNotice = roundMoney(notice.amount);

  return {
    total: roundMoney(
      roundedSalaryBalance +
        roundedVacation +
        roundedThirteenth +
        roundedFgts +
        roundedFgtsFine +
        roundedNotice,
    ),
    salaryBalance: roundedSalaryBalance,
    vacation: roundedVacation,
    thirteenth: roundedThirteenth,
    fgts: roundedFgts,
    fgtsFine: roundedFgtsFine,
    notice: roundedNotice,
    daysWorkedInMonth,
    proportionalMonths,
    vacationMonths,
    workedMonths,
    estimatedFgtsBalance: roundMoney(estimatedFgtsBalance),
    noticeDays: notice.days,
    noticeIsDiscount: notice.isDiscount,
  };
}
