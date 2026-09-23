import type { ReactNode } from "react";
import type { Budget } from "@/app/lib/api/types";
import type { AllocationSummary } from "@/app/lib/utils/allocation";

export type BudgetDialogProps = {
  budget?: Budget;
  onSuccess?: () => void;
  onDelete?: () => void;
};

export type BudgetUseProps = {
  budget: Budget;
  icon: ReactNode;
  iconBg?: string;
  iconColor?: string;
  borderColor?: string;
  onEdit: (budget: Budget) => void;
};

export type BudgetProgressProps = {
  spent: number;
  limit: number;
  label: string;
  className?: string;
};

export type BudgetPageContentProps = {
  month: string;
  initialBudgets?: Budget[];
};

export type BudgetPlanDialogProps = {
  month: string;
  budgets: Budget[];
  onSuccess?: () => void;
};

export type AllocationSummaryBarProps = {
  fixedIncome: number;
  investmentReserve: number;
  summary: AllocationSummary;
};
