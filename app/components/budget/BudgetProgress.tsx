import { cn } from "cn";

export type BudgetStatus = "ok" | "warning" | "over";

// verde: até 50% · amarelo: de 50% a 100% · vermelho: acima de 100%
export const getBudgetStatus = (spent: number, limit: number) => {
  const percentage = limit > 0 ? (spent / limit) * 100 : spent > 0 ? Infinity : 0;
  const status: BudgetStatus =
    percentage > 100 ? "over" : percentage >= 50 ? "warning" : "ok";

  return { percentage, status };
};

const barColor: Record<BudgetStatus, string> = {
  ok: "bg-success",
  warning: "bg-warning",
  over: "bg-destructive",
};

import type { BudgetProgressProps } from "@/app/types/budget";

export type { BudgetProgressProps };

export const BudgetProgress = ({
  spent,
  limit,
  label,
  className,
}: BudgetProgressProps) => {
  const { percentage, status } = getBudgetStatus(spent, limit);
  const width = Math.min(percentage, 100);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(width)}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className={cn("h-full rounded-full transition-all", barColor[status])}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
