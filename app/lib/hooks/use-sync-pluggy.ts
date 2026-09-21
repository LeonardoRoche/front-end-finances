"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import type { SyncPluggyResult } from "@/app/lib/api/types";

export function useSyncPluggy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      api<SyncPluggyResult>("/pluggy/sync", { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}
