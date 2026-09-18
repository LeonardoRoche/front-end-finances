import { Briefcase, ShoppingCart, Tv, Zap } from "lucide-react";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import { formatarDataAbreviada } from "@/app/lib/utils/DateFormatter";

export type TransactionType =
  | "Food"
  | "Income"
  | "Fixed Expenses"
  | "Subscriptions";

export type TransactionProps = {
  Title: string;
  Amount: number;
  Date: string;
  Type: TransactionType;
};

export const categoryConfig: Record<
  TransactionType,
  { icon: React.ReactNode; label: string; iconBg: string; iconColor: string }
> = {
  Food: {
    icon: <ShoppingCart size={18} />,
    label: "Alimentação",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
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
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  Subscriptions: {
    icon: <Tv size={18} />,
    label: "Assinaturas",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
};

export const Transactions = ({
  Title,
  Amount,
  Date,
  Type,
}: TransactionProps) => {
  const { icon, label, iconBg, iconColor } = categoryConfig[Type];
  const isIncome = Type === "Income";

  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium">{Title}</h3>
          <p className="text-xs text-muted-foreground">
            {label} · {formatarDataAbreviada(Date)}
          </p>
        </div>
      </div>
      <p
        className={`text-sm font-semibold ${isIncome ? "text-success" : "text-destructive"}`}
      >
        {isIncome ? "+" : "-"}
        {formatarParaBRLCode(Amount)}
      </p>
    </div>
  );
};
