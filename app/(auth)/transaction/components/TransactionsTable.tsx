"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "cn";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import { CategoryBadge } from "@/app/components/ui/category-badge";
import { ConfirmDeleteDialog } from "@/app/components/ui/confirm-delete-dialog";
import { Dialog } from "@/app/components/ui/dialog";
import type { Transaction } from "@/app/lib/api/types";
import type { TransactionsTableProps } from "@/app/types/transaction";
import { getCategoryConfig } from "@/app/lib/categories";
import { useDeleteTransaction } from "@/app/lib/hooks/use-transactions";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import { formatarDataAbreviada } from "@/app/lib/utils/DateFormatter";
import { TransactionDialog } from "./TransactionDialog";

export type { TransactionsTableProps };

export const TransactionsTable = ({
  transactions,
  isLoading,
  isError,
}: TransactionsTableProps) => {
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null,
  );
  const [deleteTransaction, setDeleteTransaction] =
    useState<Transaction | null>(null);
  const deleteMutation = useDeleteTransaction();

  function handleDelete() {
    if (!deleteTransaction) {
      return;
    }

    deleteMutation.mutate(deleteTransaction.id, {
      onSuccess: () => setDeleteTransaction(null),
    });
  }

  return (
    <>
      <div className="surface-card overflow-hidden">
        <div className="border-b border-border/80 bg-muted/30 px-4 py-3">
          <p className="text-sm font-medium">Movimentações</p>
          <p className="text-xs text-muted-foreground">
            Clique nos três pontinhos para editar categoria, valor ou descrição
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border/60 bg-muted/20 hover:bg-muted/20">
              <TableHead className="pl-4 text-xs uppercase tracking-wide text-muted-foreground">
                Descrição
              </TableHead>
              <TableHead className="hidden sm:table-cell text-xs uppercase tracking-wide text-muted-foreground">
                Categoria
              </TableHead>
              <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-muted-foreground">
                Conta
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                Data
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
                Valor
              </TableHead>
              <TableHead className="w-10 pr-3" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="pl-4">
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-destructive"
                >
                  Não foi possível carregar as transações.
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((item, index) => {
                const isIncome = item.amount > 0;
                const config = getCategoryConfig(item.category);

                return (
                  <TableRow
                    key={item.id}
                    className={cn(
                      "border-border/50 transition-colors",
                      index % 2 === 0 ? "bg-card" : "bg-muted/15",
                    )}
                  >
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-xl border",
                            config.iconBg,
                            config.iconColor,
                            config.borderColor,
                          )}
                        >
                          <span className="[&>svg]:size-4">{config.icon}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{item.description}</p>
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {config.label}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <CategoryBadge category={item.category} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {item.account}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatarDataAbreviada(item.date)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-sm font-semibold tabular-nums",
                          isIncome
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
                        )}
                      >
                        {isIncome ? "+" : "-"}
                        {formatarParaBRLCode(Math.abs(item.amount))}
                      </span>
                    </TableCell>
                    <TableCell className="pr-3">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Editar ${item.description}`}
                        className="text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        onClick={() => setEditTransaction(item)}
                      >
                        <MoreHorizontal />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={Boolean(editTransaction)}
        onOpenChange={(open) => !open && setEditTransaction(null)}
      >
        {editTransaction ? (
          <TransactionDialog
            transaction={editTransaction}
            onSuccess={() => setEditTransaction(null)}
            onDelete={() => {
              setDeleteTransaction(editTransaction);
              setEditTransaction(null);
            }}
          />
        ) : null}
      </Dialog>

      <ConfirmDeleteDialog
        open={Boolean(deleteTransaction)}
        onOpenChange={(open) => !open && setDeleteTransaction(null)}
        title="Excluir transação"
        description={`Tem certeza que deseja excluir "${deleteTransaction?.description}"?`}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </>
  );
};
