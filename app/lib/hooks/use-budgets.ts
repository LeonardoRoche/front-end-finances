"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import { queryKeys } from "@/app/lib/api/keys";
import type {
  Budget,
  CreateBudgetInput,
  UpdateBudgetInput,
} from "@/app/lib/api/types";
import { getCurrentMonth } from "@/app/lib/utils/month";

function buildBudgetsQuery(limit?: number, month?: string) {
  const params = new URLSearchParams();

  if (limit) params.set("limit", String(limit));
  if (month) params.set("month", month);

  const query = params.toString();
  return query ? `/budgets?${query}` : "/budgets";
}

export function useBudgets(limit?: number, month = getCurrentMonth()) {
  return useQuery({
    queryKey: queryKeys.budgets.all(limit, month),
    queryFn: () => api<Budget[]>(buildBudgetsQuery(limit, month)),
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBudgetInput) =>
      api<Budget>("/budgets", { method: "POST", body: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateBudgetInput }) =>
      api<Budget>(`/budgets/${id}`, { method: "PATCH", body: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api<void>(`/budgets/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
