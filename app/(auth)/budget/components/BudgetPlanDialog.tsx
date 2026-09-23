"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { CategoryBadge } from "@/app/components/ui/category-badge";
import { AllocationSummaryBar } from "./AllocationSummaryBar";
import { budgetCategoryOptions } from "@/app/lib/categories";
import { api } from "@/app/lib/api/client";
import { useBudgetPlan } from "@/app/lib/hooks/use-budget-plan";
import { useDashboardSummary } from "@/app/lib/hooks/use-dashboard-summary";
import {
  calculateAllocationSummary,
  parseCurrencyInput,
} from "@/app/lib/utils/allocation";
import type { Budget, CreateBudgetInput } from "@/app/lib/api/types";
import type { BudgetPlanDialogProps } from "@/app/types/budget";

type CategoryAllocation = {
  enabled: boolean;
  amount: string;
};

function buildInitialAllocations(budgets: Budget[]): Record<string, CategoryAllocation> {
  const budgetByCategory = Object.fromEntries(
    budgets.map((budget) => [budget.title, budget]),
  );

  return Object.fromEntries(
    budgetCategoryOptions.map((category) => {
      const existing = budgetByCategory[category];

      return [
        category,
        {
          enabled: Boolean(existing),
          amount: existing ? String(existing.totalAmount) : "",
        },
      ];
    }),
  );
}

export const BudgetPlanDialog = ({
  month,
  budgets,
  onSuccess,
}: BudgetPlanDialogProps) => {
  const queryClient = useQueryClient();
  const { plan, savePlan, isLoaded } = useBudgetPlan(month);
  const { data: summary } = useDashboardSummary(month);

  const [fixedIncome, setFixedIncome] = useState("");
  const [investmentReserve, setInvestmentReserve] = useState("");
  const [allocations, setAllocations] = useState<Record<string, CategoryAllocation>>(
    () => buildInitialAllocations(budgets),
  );

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const suggestedIncome = plan?.fixedIncome ?? summary?.monthlySalary ?? 0;
    const suggestedInvestment = plan?.investmentReserve ?? 0;

    setFixedIncome(suggestedIncome > 0 ? String(suggestedIncome) : "");
    setInvestmentReserve(suggestedInvestment > 0 ? String(suggestedInvestment) : "");
    setAllocations(buildInitialAllocations(budgets));
  }, [isLoaded, plan, summary?.monthlySalary, budgets]);

  const parsedFixedIncome = parseCurrencyInput(fixedIncome);
  const parsedInvestmentReserve = parseCurrencyInput(investmentReserve);

  const parsedAllocations = useMemo(() => {
    return Object.fromEntries(
      Object.entries(allocations)
        .filter(([, value]) => value.enabled)
        .map(([category, value]) => [category, parseCurrencyInput(value.amount)]),
    );
  }, [allocations]);

  const allocationSummary = useMemo(
    () =>
      calculateAllocationSummary(
        parsedFixedIncome,
        parsedInvestmentReserve,
        parsedAllocations,
      ),
    [parsedFixedIncome, parsedInvestmentReserve, parsedAllocations],
  );

  const savePlanMutation = useMutation({
    mutationFn: async () => {
      const budgetByCategory = Object.fromEntries(
        budgets.map((budget) => [budget.title, budget]),
      );

      const entries = Object.entries(parsedAllocations).filter(
        ([, amount]) => amount > 0,
      );

      for (const [category, limit] of entries) {
        const payload: CreateBudgetInput = {
          category,
          limit,
          period: "monthly",
          alertThreshold: 80,
        };

        const existing = budgetByCategory[category];

        try {
          if (existing) {
            await api<Budget>(`/budgets/${existing.id}`, {
              method: "PATCH",
              body: payload,
            });
          } else {
            await api<Budget>("/budgets", { method: "POST", body: payload });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Erro desconhecido";
          throw new Error(`Falha ao salvar ${category}: ${message}`);
        }
      }

      savePlan(parsedFixedIncome, parsedInvestmentReserve);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      onSuccess?.();
    },
  });

  function toggleCategory(category: string, enabled: boolean) {
    setAllocations((current) => ({
      ...current,
      [category]: {
        ...current[category],
        enabled,
      },
    }));
  }

  function updateCategoryAmount(category: string, amount: string) {
    setAllocations((current) => ({
      ...current,
      [category]: {
        ...current[category],
        amount,
        enabled: true,
      },
    }));
  }

  function distributeRemaining(category: string) {
    const remaining = allocationSummary.remaining;

    if (remaining <= 0) {
      return;
    }

    const currentAmount = parseCurrencyInput(allocations[category]?.amount ?? "");
    setAllocations((current) => ({
      ...current,
      [category]: {
        enabled: true,
        amount: String(currentAmount + remaining),
      },
    }));
  }

  const hasSelectedCategories = Object.values(parsedAllocations).some(
    (amount) => amount > 0,
  );

  const investmentExceedsIncome =
    parsedInvestmentReserve > parsedFixedIncome && parsedFixedIncome > 0;

  const canSave =
    parsedFixedIncome > 0 &&
    parsedInvestmentReserve >= 0 &&
    !investmentExceedsIncome &&
    !allocationSummary.isOverBudget &&
    hasSelectedCategories &&
    !savePlanMutation.isPending;

  return (
    <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Planejar orçamentos do mês</DialogTitle>
        <DialogDescription>
          Informe sua renda fixa, defina quanto quer reservar para investir e
          distribua o restante entre as categorias.
        </DialogDescription>
      </DialogHeader>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="fixed-income">Renda fixa</Label>
            <Input
              id="fixed-income"
              placeholder="R$ 0,00"
              value={fixedIncome}
              onChange={(event) => setFixedIncome(event.target.value)}
            />
            {summary?.monthlySalary ? (
              <p className="text-xs text-muted-foreground">
                Detectamos {summary.monthlySalary.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} em
                entradas de salário este mês.
              </p>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="investment-reserve">Reserva para investir</Label>
            <Input
              id="investment-reserve"
              placeholder="R$ 0,00"
              value={investmentReserve}
              onChange={(event) => setInvestmentReserve(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Esse valor fica protegido e não entra na distribuição dos orçamentos.
            </p>
          </div>
        </div>

        {parsedFixedIncome > 0 ? (
          <AllocationSummaryBar
            fixedIncome={parsedFixedIncome}
            investmentReserve={parsedInvestmentReserve}
            summary={allocationSummary}
          />
        ) : null}

        {investmentExceedsIncome ? (
          <p className="text-sm text-destructive">
            A reserva para investir não pode ser maior que a renda fixa.
          </p>
        ) : null}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Categorias</Label>
            {allocationSummary.remaining > 0 ? (
              <span className="text-xs text-muted-foreground">
                Clique em &quot;Usar restante&quot; para preencher rapidamente
              </span>
            ) : null}
          </div>

          <div className="space-y-2 rounded-xl border p-2">
            {budgetCategoryOptions.map((category) => {
              const allocation = allocations[category] ?? {
                enabled: false,
                amount: "",
              };

              return (
                <div
                  key={category}
                  className="flex flex-col gap-2 rounded-lg p-2 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center"
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={allocation.enabled}
                      onChange={(event) =>
                        toggleCategory(category, event.target.checked)
                      }
                      className="size-4 rounded border-input accent-primary"
                    />
                    <CategoryBadge category={category} />
                  </label>

                  <div className="flex items-center gap-2 sm:w-56">
                    <Input
                      placeholder="R$ 0,00"
                      value={allocation.amount}
                      disabled={!allocation.enabled}
                      onChange={(event) =>
                        updateCategoryAmount(category, event.target.value)
                      }
                      aria-label={`Valor do orçamento de ${category}`}
                    />
                    {allocationSummary.remaining > 0 && allocation.enabled ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        onClick={() => distributeRemaining(category)}
                      >
                        Usar restante
                      </Button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {savePlanMutation.isError ? (
          <p className="text-sm text-destructive">
            {savePlanMutation.error instanceof Error
              ? savePlanMutation.error.message
              : "Não foi possível salvar o plano. Tente novamente."}
          </p>
        ) : null}
      </div>

      <DialogFooter className="gap-2 sm:justify-end">
        <DialogClose render={<Button variant="outline">Cancelar</Button>} />
        <Button onClick={() => savePlanMutation.mutate()} disabled={!canSave}>
          {savePlanMutation.isPending ? "Salvando..." : "Salvar plano"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
