"use client";

import { MoreHorizontal } from "lucide-react";
import { cn } from "cn";
import {
  BudgetProgress,
  getBudgetStatus,
} from "@/app/components/budget/BudgetProgress";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import type { BudgetUseProps } from "@/app/types/budget";

export type { BudgetUseProps };

export const BudgetUse = ({
  budget,
  icon,
  iconBg = "bg-muted",
  iconColor = "text-foreground",
  borderColor = "border-border",
  onEdit,
}: BudgetUseProps) => {
  const { amount, title, totalAmount, period, alertThreshold } = budget;
  const { percentage, status } = getBudgetStatus(amount, totalAmount);
  const isOverBudget = status === "over";

  return (
    <Card
      className={cn(
        "surface-card border-border/80 shadow-md shadow-primary/5 transition-shadow hover:shadow-lg",
        isOverBudget && "ring-2 ring-destructive/30",
      )}
    >
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl border",
                iconBg,
                iconColor,
                borderColor,
              )}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{title}</h3>
              <p className="text-xs text-muted-foreground">
                {period === "monthly" ? "Mensal" : "Semanal"} · alerta em{" "}
                {alertThreshold}%
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Editar orçamento de ${title}`}
            className="shrink-0 text-muted-foreground hover:bg-primary/10 hover:text-primary"
            onClick={() => onEdit(budget)}
          >
            <MoreHorizontal />
          </Button>
        </div>

        <div>
          <p className="text-2xl font-bold tabular-nums tracking-tight">
            {formatarParaBRLCode(amount)}
          </p>
          <p className="text-sm text-muted-foreground">
            de {formatarParaBRLCode(totalAmount)} definidos
          </p>
        </div>

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
