"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import { queryKeys } from "@/app/lib/api/keys";
import { fetchConnections } from "@/app/lib/api/queries";
import type { Connection, CreateConnectionInput } from "@/app/lib/api/types";

type UseConnectionsOptions = {
  initialData?: Connection[];
};

export function useConnections(options: UseConnectionsOptions = {}) {
  return useQuery({
    queryKey: queryKeys.connections.all(),
    queryFn: fetchConnections,
    initialData: options.initialData,
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
