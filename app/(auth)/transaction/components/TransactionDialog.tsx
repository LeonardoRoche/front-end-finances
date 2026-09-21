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
import { transactionCategoryOptions } from "@/app/lib/categories";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "@/app/lib/hooks/use-transactions";
import type { TransactionDialogProps } from "@/app/types/transaction";

export type { TransactionDialogProps };

function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export const TransactionDialog = ({
  transaction,
  onSuccess,
  onDelete,
}: TransactionDialogProps) => {
  const isEditing = Boolean(transaction);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("Conta corrente");
  const [date, setDate] = useState(getTodayDate());
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const isPending = createTransaction.isPending || updateTransaction.isPending;
  const isError = createTransaction.isError || updateTransaction.isError;

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setCategory(transaction.category);
      setAccount(transaction.account);
      setDate(transaction.date);
      setAmount(String(Math.abs(transaction.amount)));
      setType(transaction.amount >= 0 ? "income" : "expense");
      return;
    }

    setDescription("");
    setCategory("");
    setAccount("Conta corrente");
    setDate(getTodayDate());
    setAmount("");
    setType("expense");
  }, [transaction]);

  function handleSubmit() {
    const parsedAmount = Number(amount.replace(",", "."));

    if (!description.trim() || !category || !parsedAmount || parsedAmount <= 0) {
      return;
    }

    const signedAmount = type === "income" ? parsedAmount : -parsedAmount;
    const payload = {
      description: description.trim(),
      category,
      account: account.trim() || "Conta corrente",
      date,
      amount: signedAmount,
    };

    if (isEditing && transaction) {
      updateTransaction.mutate(
        { id: transaction.id, input: payload },
        { onSuccess: () => onSuccess?.() },
      );
      return;
    }

    createTransaction.mutate(payload, { onSuccess: () => onSuccess?.() });
  }

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          {isEditing ? "Editar transação" : "Nova transação"}
        </DialogTitle>
      </DialogHeader>

      {isEditing && category ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Categoria atual:</span>
          <CategoryBadge category={category} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="description">Descrição</Label>
          <Input
            id="description"
            placeholder="Ex.: Supermercado"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="transaction-type">Tipo</Label>
          <Select
            value={type}
            onValueChange={(value) =>
              value && setType(value as "income" | "expense")
            }
          >
            <SelectTrigger id="transaction-type" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">Saída</SelectItem>
              <SelectItem value="income">Entrada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="transaction-category">Categoria</Label>
          <Select
            value={category}
            onValueChange={(value) => value && setCategory(value)}
          >
            <SelectTrigger id="transaction-category" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {transactionCategoryOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="transaction-account">Conta</Label>
          <Input
            id="transaction-account"
            placeholder="Conta corrente"
            value={account}
            onChange={(event) => setAccount(event.target.value)}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="transaction-date">Data</Label>
          <Input
            id="transaction-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="transaction-amount">Valor</Label>
          <Input
            id="transaction-amount"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
      </div>

      {isError ? (
        <p className="text-sm text-destructive">
          Não foi possível salvar a transação.
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
            disabled={
              isPending || !description.trim() || !category || !amount
            }
          >
            {isPending
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Criar transação"}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};
