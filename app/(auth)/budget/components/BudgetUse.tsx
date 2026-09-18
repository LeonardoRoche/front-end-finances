import { MoreHorizontal } from "lucide-react";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";

type BudgetPageContentProps = {
  amount: number;
  title: string;
  icon: React.ReactNode;
  totalAmount: number;
  iconBg?: string;
  iconColor?: string;
};

export const BudgetUse = ({
  amount,
  title,
  icon,
  totalAmount,
  iconBg = "bg-muted",
  iconColor = "text-foreground",
}: BudgetPageContentProps) => {
  const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
  const isOverBudget = amount > totalAmount;
  const isNearLimit = !isOverBudget && percentage >= 75;

  const barColor = isOverBudget
    ? "bg-red-600"
    : isNearLimit
      ? "bg-amber-500"
      : "bg-green-600";

  const statusColor = isOverBudget
    ? "text-red-600"
    : isNearLimit
      ? "text-amber-600"
      : "text-green-600";

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border bg-card p-4 ${
        isOverBudget ? "border-red-300" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-10 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
          >
            {icon}
          </div>
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <p className="text-2xl font-semibold">
        {formatarParaBRLCode(amount)}
        <span className="ml-1 text-base font-normal text-muted-foreground">
          / {totalAmount}
        </span>
      </p>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <p className={`text-xs ${statusColor}`}>
        {isOverBudget
          ? `Estourado em ${formatarParaBRLCode(amount - totalAmount)}`
          : `${Math.round(percentage)}% usado · faltam ${formatarParaBRLCode(
              totalAmount - amount,
            )}`}
      </p>
    </div>
  );
};
