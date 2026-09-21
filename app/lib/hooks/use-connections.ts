"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import { queryKeys } from "@/app/lib/api/keys";
import type { Connection, CreateConnectionInput } from "@/app/lib/api/types";

export function useConnections() {
  return useQuery({
    queryKey: queryKeys.connections.all(),
    queryFn: () => api<Connection[]>("/connections"),
  });
}

export function useCreateConnection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateConnectionInput) =>
      api<Connection>("/connections", { method: "POST", body: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    },
  });
}
