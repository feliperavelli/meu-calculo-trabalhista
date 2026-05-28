export function currency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}

export function onlyNumbersAndDecimal(value: string): string {
  const cleanValue = value.trim().replace(/[^\d.,]/g, "");

  if (cleanValue.includes(",") && cleanValue.includes(".")) {
    return cleanValue.replace(/\./g, "").replace(",", ".");
  }

  return cleanValue.replace(",", ".");
}
