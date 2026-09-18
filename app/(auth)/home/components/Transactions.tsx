import { Briefcase, ShoppingCart, Tv, Zap } from "lucide-react";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import { formatarDataAbreviada } from "@/app/lib/utils/DateFormatter";

export type TransactionType =
  | "Food"
  | "Income"
  | "Fixed Expenses"
  | "Subscriptions";

export type TransactionProps = {
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
};

// Cores de categoria não usam destructive/warning: essas são reservadas para status.
export const categoryConfig: Record<
  TransactionType,
  { icon: React.ReactNode; label: string; iconBg: string; iconColor: string }
> = {
  Food: {
    icon: <ShoppingCart size={18} />,
    label: "Alimentação",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  Income: {
    icon: <Briefcase size={18} />,
    label: "Renda",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  "Fixed Expenses": {
    icon: <Zap size={18} />,
    label: "Despesas Fixas",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  Subscriptions: {
    icon: <Tv size={18} />,
    label: "Assinaturas",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
};

export const Transactions = ({
  title,
  amount,
  date,
  type,
}: TransactionProps) => {
  const { icon, label, iconBg, iconColor } = categoryConfig[type];
  const isIncome = type === "Income";

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {label} · {formatarDataAbreviada(date)}
          </p>
        </div>
      </div>
      <p
        className={`shrink-0 text-sm font-semibold tabular-nums ${isIncome ? "text-success" : ""}`}
      >
        {isIncome ? "+" : "-"}
        {formatarParaBRLCode(amount)}
      </p>
    </div>
  );
};
