export function getCurrentMonth(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
}

export function getPreviousMonth(reference = new Date()): string {
  const date = new Date(reference.getFullYear(), reference.getMonth() - 1, 1);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
}

const monthLabels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function formatMonthLabel(month: string): string {
  const [year, monthNumber] = month.split("-");
  const index = Number(monthNumber) - 1;

  if (!year || index < 0 || index > 11) {
    return month;
  }

  return `${monthLabels[index]} ${year}`;
}

export function periodToMonth(period: string): string | undefined {
  if (period === "Este mês") return getCurrentMonth();
  if (period === "Mês passado") return getPreviousMonth();
  return undefined;
}
