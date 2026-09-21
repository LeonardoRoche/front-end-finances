import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import { formatarDataAbreviada } from "@/app/lib/utils/DateFormatter";
import { getCategoryConfig } from "@/app/lib/categories";
import type { TransactionPreviewProps } from "@/app/types/home";

export type { TransactionPreviewProps };

export const Transactions = ({ transaction }: TransactionPreviewProps) => {
  const { icon, label, iconBg, iconColor, isIncome } = getCategoryConfig(
    transaction.category,
  );
  const isPositive = transaction.amount > 0 || Boolean(isIncome);

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium">
            {transaction.description}
          </h3>
          <p className="text-xs text-muted-foreground">
            {label} · {formatarDataAbreviada(transaction.date)}
          </p>
        </div>
      </div>
      <p
        className={`shrink-0 text-sm font-semibold tabular-nums ${isPositive ? "text-success" : ""}`}
      >
        {isPositive ? "+" : "-"}
        {formatarParaBRLCode(Math.abs(transaction.amount))}
      </p>
    </div>
  );
};
