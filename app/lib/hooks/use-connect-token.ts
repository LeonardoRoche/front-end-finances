"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import type { ConnectTokenResponse } from "@/app/lib/api/types";

export function useConnectToken() {
  return useMutation({
    mutationFn: () =>
      api<ConnectTokenResponse>("/pluggy/connect-token", { method: "POST" }),
  });
}
