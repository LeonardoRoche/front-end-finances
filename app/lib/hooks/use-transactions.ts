"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import { queryKeys } from "@/app/lib/api/keys";
import { fetchTransactions } from "@/app/lib/api/queries";
import type {
  CreateTransactionInput,
  PaginatedTransactions,
  Transaction,
  TransactionFilters,
  UpdateTransactionInput,
} from "@/app/lib/api/types";

type UseTransactionsOptions = {
  initialData?: PaginatedTransactions;
};

export function useTransactions(
  filters: TransactionFilters = {},
  options: UseTransactionsOptions = {},
) {
  return useQuery({
    queryKey: queryKeys.transactions.all(filters),
    queryFn: () => fetchTransactions(filters),
    initialData: options.initialData,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTransactionInput) =>
      api<Transaction>("/transactions", { method: "POST", body: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTransactionInput }) =>
      api<Transaction>(`/transactions/${id}`, { method: "PATCH", body: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api<void>(`/transactions/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}
