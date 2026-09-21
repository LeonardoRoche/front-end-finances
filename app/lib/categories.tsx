import type { ReactNode } from "react";
import {
  ArrowLeftRight,
  Briefcase,
  Car,
  Clapperboard,
  HeartPulse,
  ShoppingCart,
  Tv,
  Zap,
} from "lucide-react";

export type CategoryConfig = {
  label: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  isIncome?: boolean;
  isTransfer?: boolean;
};

const defaultConfig: CategoryConfig = {
  label: "Outros",
  icon: <Zap size={18} />,
  iconBg: "bg-slate-100 dark:bg-slate-800/80",
  iconColor: "text-slate-600 dark:text-slate-300",
  borderColor: "border-slate-200 dark:border-slate-700",
};

export const categoryMap: Record<string, CategoryConfig> = {
  Alimentação: {
    label: "Alimentação",
    icon: <ShoppingCart size={18} />,
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
    iconColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  Transporte: {
    label: "Mobilidade",
    icon: <Car size={18} />,
    iconBg: "bg-sky-50 dark:bg-sky-950/40",
    iconColor: "text-sky-700 dark:text-sky-300",
    borderColor: "border-sky-200 dark:border-sky-800",
  },
  Lazer: {
    label: "Lazer",
    icon: <Clapperboard size={18} />,
    iconBg: "bg-rose-50 dark:bg-rose-950/40",
    iconColor: "text-rose-700 dark:text-rose-300",
    borderColor: "border-rose-200 dark:border-rose-800",
  },
  Saúde: {
    label: "Saúde",
    icon: <HeartPulse size={18} />,
    iconBg: "bg-teal-50 dark:bg-teal-950/40",
    iconColor: "text-teal-700 dark:text-teal-300",
    borderColor: "border-teal-200 dark:border-teal-800",
  },
  Assinaturas: {
    label: "Assinaturas",
    icon: <Tv size={18} />,
    iconBg: "bg-violet-50 dark:bg-violet-950/40",
    iconColor: "text-violet-700 dark:text-violet-300",
    borderColor: "border-violet-200 dark:border-violet-800",
  },
  Renda: {
    label: "Renda",
    icon: <Briefcase size={18} />,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-emerald-700 dark:text-emerald-300",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    isIncome: true,
  },
  "Despesas Fixas": {
    label: "Despesas Fixas",
    icon: <Zap size={18} />,
    iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
    iconColor: "text-indigo-700 dark:text-indigo-300",
    borderColor: "border-indigo-200 dark:border-indigo-800",
  },
  Transferências: {
    label: "Transferências",
    icon: <ArrowLeftRight size={18} />,
    iconBg: "bg-slate-100 dark:bg-slate-800/80",
    iconColor: "text-slate-600 dark:text-slate-300",
    borderColor: "border-slate-200 dark:border-slate-700",
    isTransfer: true,
  },
  Outros: {
    label: "Outros",
    icon: <Zap size={18} />,
    iconBg: "bg-slate-100 dark:bg-slate-800/80",
    iconColor: "text-slate-600 dark:text-slate-300",
    borderColor: "border-slate-200 dark:border-slate-700",
  },
};

export const transactionCategoryOptions = Object.keys(categoryMap);

export const budgetCategoryOptions = transactionCategoryOptions.filter(
  (category) => category !== "Renda" && category !== "Transferências",
);

export function getCategoryConfig(category: string): CategoryConfig {
  return categoryMap[category] ?? { ...defaultConfig, label: category };
}
