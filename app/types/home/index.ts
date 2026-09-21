import type { ReactNode } from "react";
import type { Budget, DashboardSummary, Transaction } from "@/app/lib/api/types";

export type SectionHeaderProps = {
  title: string;
  href: string;
  linkLabel: string;
};

export type ListSkeletonProps = {
  rows?: number;
};

export type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon: ReactNode;
  accent: string;
  chip: string;
  valueClass?: string;
};

export type KpiCardsProps = {
  summary: DashboardSummary;
};

export type TransactionPreviewProps = {
  transaction: Transaction;
};

export type BudgetPreviewProps = {
  budget: Budget;
};
