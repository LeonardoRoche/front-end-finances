"use client";

import { cn } from "cn";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import type { AllocationSummaryBarProps } from "@/app/types/budget";

export const AllocationSummaryBar = ({
  fixedIncome,
  investmentReserve,
  summary,
}: AllocationSummaryBarProps) => {
  const {
    remaining,
    isOverBudget,
    isComplete,
    allocationPercent,
    totalBudgeted,
  } = summary;

  return (
    <div className="space-y-3 rounded-xl border bg-muted/40 p-4">
      <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <p className="text-xs text-muted-foreground">Renda fixa</p>
          <p className="font-semibold tabular-nums">
            {formatarParaBRLCode(fixedIncome)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Para investir</p>
          <p className="font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
            {formatarParaBRLCode(investmentReserve)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Orçamentos</p>
          <p className="font-semibold tabular-nums">
            {formatarParaBRLCode(totalBudgeted)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">
            {isOverBudget ? "Excedente" : "Falta distribuir"}
          </p>
          <p
            className={cn(
              "font-semibold tabular-nums",
              isOverBudget && "text-destructive",
              isComplete && "text-emerald-600 dark:text-emerald-400",
              !isOverBudget &&
                !isComplete &&
                remaining > 0 &&
                "text-amber-600 dark:text-amber-400",
            )}
          >
            {formatarParaBRLCode(Math.abs(remaining))}
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Distribuição dos orçamentos</span>
          <span>{Math.round(allocationPercent)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              isOverBudget
                ? "bg-destructive"
                : isComplete
                  ? "bg-emerald-500"
                  : "bg-primary",
            )}
            style={{ width: `${Math.min(allocationPercent, 100)}%` }}
          />
        </div>
      </div>

      {isComplete ? (
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Plano completo — sua reserva de investimento está garantida.
        </p>
      ) : isOverBudget ? (
        <p className="text-xs font-medium text-destructive">
          Os orçamentos excedem o disponível. Reduza algum valor ou aumente a
          renda.
        </p>
      ) : remaining > 0 && fixedIncome > 0 ? (
        <p className="text-xs text-muted-foreground">
          Ainda restam {formatarParaBRLCode(remaining)} para distribuir entre as
          categorias, mantendo {formatarParaBRLCode(investmentReserve)}{" "}
          reservados para investir.
        </p>
      ) : null}
    </div>
  );
};
