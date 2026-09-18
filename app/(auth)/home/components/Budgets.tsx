import { BudgetProgress } from "@/app/components/budget/BudgetProgress";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import { categoryConfig, TransactionType } from "./Transactions";

type BudgetsProps = {
  type: TransactionType;
  amount: number;
  limit: number;
};

export const Budgets = ({ type, amount, limit }: BudgetsProps) => {
  const { label, icon, iconBg, iconColor } = categoryConfig[type];

  return (
    <div className="flex flex-col gap-2 border-b border-border py-3 last:border-b-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
          >
            {icon}
          </div>
          <h3 className="truncate text-sm font-medium">{label}</h3>
        </div>
        <p className="shrink-0 text-sm tabular-nums">
          <span className="font-semibold">{formatarParaBRLCode(amount)}</span>
          <span className="text-muted-foreground">
            {" "}
            / {formatarParaBRLCode(limit)}
          </span>
        </p>
      </div>
      <BudgetProgress
        spent={amount}
        limit={limit}
        label={`Uso do orçamento de ${label}`}
      />
    </div>
  );
};
