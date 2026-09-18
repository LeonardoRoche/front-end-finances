import { MoreHorizontal } from "lucide-react";
import { cn } from "cn";
import {
  BudgetProgress,
  getBudgetStatus,
} from "@/app/components/budget/BudgetProgress";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";

type BudgetUseProps = {
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
}: BudgetUseProps) => {
  const { percentage, status } = getBudgetStatus(amount, totalAmount);
  const isOverBudget = status === "over";

  return (
    <Card className={cn(isOverBudget && "ring-destructive/40")}>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
            >
              {icon}
            </div>
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Opções do orçamento de ${title}`}
            className="text-muted-foreground"
          >
            <MoreHorizontal />
          </Button>
        </div>

        <p className="text-2xl font-semibold tabular-nums">
          {formatarParaBRLCode(amount)}
          <span className="ml-1 text-base font-normal text-muted-foreground">
            / {formatarParaBRLCode(totalAmount)}
          </span>
        </p>

        <BudgetProgress
          spent={amount}
          limit={totalAmount}
          label={`Uso do orçamento de ${title}`}
        />

        <p
          className={cn(
            "text-xs text-muted-foreground",
            isOverBudget && "font-medium text-destructive",
          )}
        >
          {isOverBudget
            ? `Estourado em ${formatarParaBRLCode(amount - totalAmount)}`
            : `${Math.round(percentage)}% usado · faltam ${formatarParaBRLCode(
                totalAmount - amount,
              )}`}
        </p>
      </CardContent>
    </Card>
  );
};
