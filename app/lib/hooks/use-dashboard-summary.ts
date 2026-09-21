"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/app/lib/api/keys";
import { fetchDashboardSummary } from "@/app/lib/api/queries";
import type { DashboardSummary } from "@/app/lib/api/types";
import { getCurrentMonth } from "@/app/lib/utils/month";

type UseDashboardSummaryOptions = {
  initialData?: DashboardSummary;
};

export function useDashboardSummary(
  month = getCurrentMonth(),
  options: UseDashboardSummaryOptions = {},
) {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(month),
    queryFn: () => fetchDashboardSummary(month),
    initialData: options.initialData,
  });
}
