"use client";

import { useState } from "react";
import { PieChart, Plus } from "lucide-react";
import { BudgetUse } from "./BudgetUse";
import { BudgetDialog } from "./BudgetDialog";
import { BudgetPlanDialog } from "./BudgetPlanDialog";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import { ConfirmDeleteDialog } from "@/app/components/ui/confirm-delete-dialog";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useBudgets, useDeleteBudget } from "@/app/lib/hooks/use-budgets";
import { getCategoryConfig } from "@/app/lib/categories";
import { formatMonthLabel } from "@/app/lib/utils/month";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import { useBudgetPlan } from "@/app/lib/hooks/use-budget-plan";
import type { Budget } from "@/app/lib/api/types";
import type { BudgetPageContentProps } from "@/app/types/budget";

export const BudgetPageContent = ({
  month,
  initialBudgets,
}: BudgetPageContentProps) => {
  const [createOpen, setCreateOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [deletingBudget, setDeletingBudget] = useState<Budget | null>(null);
  const { plan } = useBudgetPlan(month);

  const { data: budgets = [], isLoading, isError } = useBudgets(
    undefined,
    month,
    { initialData: initialBudgets },
  );
  const deleteBudget = useDeleteBudget();

  function handleDelete() {
    if (!deletingBudget) {
      return;
    }

    deleteBudget.mutate(deletingBudget.id, {
      onSuccess: () => {
        setDeletingBudget(null);
        setEditingBudget(null);
      },
    });
  }

  return (
    <>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Orçamentos"
            description={formatMonthLabel(month)}
            action={
              <div className="flex flex-wrap gap-2">
                <Button size="lg" variant="outline" onClick={() => setPlanOpen(true)}>
                  <PieChart /> Planejar mês
                </Button>
                <DialogTrigger
                  render={
                    <Button size="lg">
                      <Plus /> Adicionar orçamento
                    </Button>
                  }
                />
              </div>
            }
          />

          {plan ? (
            <div className="surface-card flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border px-4 py-3 text-sm">
              <span>
                <span className="text-muted-foreground">Renda fixa:</span>{" "}
                <strong className="tabular-nums">
                  {formatarParaBRLCode(plan.fixedIncome)}
                </strong>
              </span>
              <span>
                <span className="text-muted-foreground">Reserva investimento:</span>{" "}
                <strong className="tabular-nums text-emerald-600 dark:text-emerald-400">
                  {formatarParaBRLCode(plan.investmentReserve)}
                </strong>
              </span>
              <Button
                variant="link"
                className="h-auto p-0 text-primary"
                onClick={() => setPlanOpen(true)}
              >
                Editar plano
              </Button>
            </div>
          ) : null}

          {isError ? (
            <p className="text-sm text-destructive">
              Não foi possível carregar os orçamentos.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-48 rounded-2xl" />
                  ))
                : budgets.length === 0 ? (
                    <div className="surface-card col-span-full px-6 py-14 text-center">
                      <p className="text-base font-medium">Nenhum orçamento ainda</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Defina limites por categoria para acompanhar seus gastos.
                      </p>
                    </div>
                  ) : (
                    budgets.map((item) => {
                      const config = getCategoryConfig(item.title);

                      return (
                        <BudgetUse
                          key={item.id}
                          budget={item}
                          icon={config.icon}
                          iconBg={config.iconBg}
                          iconColor={config.iconColor}
                          borderColor={config.borderColor}
                          onEdit={setEditingBudget}
                        />
                      );
                    })
                  )}

              <DialogTrigger
                render={
                  <Button
                    variant="outline"
                    className="surface-card h-auto min-h-36 flex-col gap-2 border-dashed bg-transparent p-5 text-muted-foreground hover:border-primary hover:text-primary"
                  >
                    <Plus size={20} />
                    <span className="text-sm font-medium">Adicionar categoria</span>
                  </Button>
                }
              />
            </div>
          )}
        </div>

        <BudgetDialog onSuccess={() => setCreateOpen(false)} />
      </Dialog>

      <Dialog
        open={Boolean(editingBudget) && !deletingBudget}
        onOpenChange={(open) => !open && setEditingBudget(null)}
      >
        {editingBudget && !deletingBudget ? (
          <BudgetDialog
            budget={editingBudget}
            onSuccess={() => setEditingBudget(null)}
            onDelete={() => setDeletingBudget(editingBudget)}
          />
        ) : null}
      </Dialog>

      <ConfirmDeleteDialog
        open={Boolean(deletingBudget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingBudget(null);
          }
        }}
        title="Excluir orçamento"
        description={`Tem certeza que deseja excluir o orçamento de ${deletingBudget?.title}? Essa ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        isPending={deleteBudget.isPending}
      />

      {deleteBudget.isError ? (
        <p className="text-sm text-destructive">
          Não foi possível excluir o orçamento. Tente novamente.
        </p>
      ) : null}

      <Dialog open={planOpen} onOpenChange={setPlanOpen}>
        <BudgetPlanDialog
          month={month}
          budgets={budgets}
          onSuccess={() => setPlanOpen(false)}
        />
      </Dialog>
    </>
  );
};
