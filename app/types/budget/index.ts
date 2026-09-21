import type { ReactNode } from "react";
import type { Budget } from "@/app/lib/api/types";

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
