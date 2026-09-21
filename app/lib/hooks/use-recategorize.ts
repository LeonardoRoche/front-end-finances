"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import type { RecategorizeResult } from "@/app/lib/api/types";

export function useRecategorize() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      api<RecategorizeResult>("/pluggy/recategorize", { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}
