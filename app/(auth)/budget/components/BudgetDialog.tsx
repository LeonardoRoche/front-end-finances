"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { CategoryBadge } from "@/app/components/ui/category-badge";
import { budgetCategoryOptions } from "@/app/lib/categories";
import { useCreateBudget, useUpdateBudget } from "@/app/lib/hooks/use-budgets";
import type { BudgetDialogProps } from "@/app/types/budget";

export type { BudgetDialogProps };

export const BudgetDialog = ({ budget, onSuccess, onDelete }: BudgetDialogProps) => {
  const isEditing = Boolean(budget);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [period, setPeriod] = useState<"monthly" | "weekly">("monthly");
  const [alertThreshold, setAlertThreshold] = useState<"80" | "100">("80");

  const createBudget = useCreateBudget();
  const updateBudget = useUpdateBudget();
  const isPending = createBudget.isPending || updateBudget.isPending;
  const isError = createBudget.isError || updateBudget.isError;

  useEffect(() => {
    if (budget) {
      setCategory(budget.title);
      setLimit(String(budget.totalAmount));
      setPeriod(budget.period);
      setAlertThreshold(String(budget.alertThreshold) as "80" | "100");
      return;
    }

    setCategory("");
    setLimit("");
    setPeriod("monthly");
    setAlertThreshold("80");
  }, [budget]);

  function handleSubmit() {
    const parsedLimit = Number(limit.replace(",", "."));

    if (!category || !parsedLimit || parsedLimit <= 0) {
      return;
    }

    const payload = {
      category,
      limit: parsedLimit,
      period,
      alertThreshold: Number(alertThreshold) as 80 | 100,
    };

    if (isEditing && budget) {
      updateBudget.mutate(
        { id: budget.id, input: payload },
        { onSuccess: () => onSuccess?.() },
      );
      return;
    }

    createBudget.mutate(payload, { onSuccess: () => onSuccess?.() });
  }

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          {isEditing ? "Editar orçamento" : "Novo orçamento"}
        </DialogTitle>
      </DialogHeader>

      {isEditing && category ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Categoria:</span>
          <CategoryBadge category={category} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={category}
            onValueChange={(value) => value && setCategory(value)}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {budgetCategoryOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="limit">Valor limite</Label>
          <Input
            id="limit"
            placeholder="R$ 0,00"
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="period">Período</Label>
          <Select
            value={period}
            onValueChange={(value) =>
              value && setPeriod(value as "monthly" | "weekly")
            }
          >
            <SelectTrigger id="period" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="alert">Alertar ao atingir</Label>
          <Select
            value={alertThreshold}
            onValueChange={(value) =>
              value && setAlertThreshold(value as "80" | "100")
            }
          >
            <SelectTrigger id="alert" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="80">80% do limite</SelectItem>
              <SelectItem value="100">100% do limite</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isError ? (
        <p className="text-sm text-destructive">
          Não foi possível salvar o orçamento.
        </p>
      ) : null}

      <DialogFooter className="gap-2 sm:justify-between">
        {isEditing && onDelete ? (
          <Button
            type="button"
            variant="outline"
            className="text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 />
            Excluir
          </Button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button
            onClick={handleSubmit}
            disabled={isPending || !category || !limit}
          >
            {isPending
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Criar orçamento"}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};
