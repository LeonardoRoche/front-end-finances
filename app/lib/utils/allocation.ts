export type AllocationSummary = {
  totalBudgeted: number;
  availableForBudgets: number;
  remaining: number;
  isOverBudget: boolean;
  isComplete: boolean;
  allocationPercent: number;
};

export function parseCurrencyInput(value: string): number {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);

  if (Number.isNaN(parsed)) {
    return 0;
  }

  return parsed;
}

export function calculateAllocationSummary(
  fixedIncome: number,
  investmentReserve: number,
  allocations: Record<string, number>,
): AllocationSummary {
  const totalBudgeted = Object.values(allocations).reduce(
    (sum, value) => sum + value,
    0,
  );
  const availableForBudgets = Math.max(fixedIncome - investmentReserve, 0);
  const remaining = availableForBudgets - totalBudgeted;
  const allocationPercent =
    availableForBudgets > 0
      ? Math.min((totalBudgeted / availableForBudgets) * 100, 100)
      : 0;

  return {
    totalBudgeted,
    availableForBudgets,
    remaining,
    isOverBudget: remaining < 0,
    isComplete: remaining === 0 && availableForBudgets > 0,
    allocationPercent,
  };
}
