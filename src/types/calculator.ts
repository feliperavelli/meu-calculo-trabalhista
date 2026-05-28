export type TerminationType = "sem-justa-causa" | "pedido-demissao" | "justa-causa" | "termino-contrato";

export type NoticeType = "indenizado" | "trabalhado" | "dispensado";

export type YesNo = "sim" | "nao";

export type CalculatorForm = {
  salary: string;
  admissionDate: string;
  dismissalDate: string;
  terminationType: TerminationType | "";
  noticeType: NoticeType | "";
  hasExpiredVacation: YesNo | "";
};

export type CalculationResult = {
  total: number;
  salaryBalance: number;
  vacation: number;
  thirteenth: number;
  fgts: number;
  fgtsFine: number;
  notice: number;
  daysWorkedInMonth: number;
  proportionalMonths: number;
  vacationMonths: number;
  workedMonths: number;
  estimatedFgtsBalance: number;
  noticeDays: number;
  noticeIsDiscount: boolean;
};
