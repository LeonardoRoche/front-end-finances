"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/api/client";
import { queryKeys } from "@/app/lib/api/keys";
import type { DashboardSummary } from "@/app/lib/api/types";
import { getCurrentMonth } from "@/app/lib/utils/month";

export function useDashboardSummary(month = getCurrentMonth()) {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(month),
    queryFn: () =>
      api<DashboardSummary>(`/dashboard/summary?month=${month}`),
  });
}
