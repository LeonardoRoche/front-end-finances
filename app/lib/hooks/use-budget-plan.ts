"use client";

import { useCallback, useEffect, useState } from "react";

export type BudgetPlan = {
  month: string;
  fixedIncome: number;
  investmentReserve: number;
};

const STORAGE_KEY = "budget-plan";

function readPlans(): Record<string, BudgetPlan> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, BudgetPlan>) : {};
  } catch {
    return {};
  }
}

function writePlans(plans: Record<string, BudgetPlan>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function useBudgetPlan(month: string) {
  const [plan, setPlanState] = useState<BudgetPlan | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const plans = readPlans();
    setPlanState(plans[month] ?? null);
    setIsLoaded(true);
  }, [month]);

  const savePlan = useCallback(
    (fixedIncome: number, investmentReserve: number) => {
      const nextPlan: BudgetPlan = { month, fixedIncome, investmentReserve };
      const plans = readPlans();
      plans[month] = nextPlan;
      writePlans(plans);
      setPlanState(nextPlan);
    },
    [month],
  );

  return { plan, savePlan, isLoaded };
}
