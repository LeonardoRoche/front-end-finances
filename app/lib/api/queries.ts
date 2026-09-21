import { apiFetch } from "@/app/lib/api/fetcher";
import type {
  Budget,
  Connection,
  DashboardSummary,
  Transaction,
  TransactionFilters,
} from "@/app/lib/api/types";

export function buildBudgetsPath(limit?: number, month?: string): string {
  const params = new URLSearchParams();

  if (limit) params.set("limit", String(limit));
  if (month) params.set("month", month);

  const query = params.toString();
  return query ? `/budgets?${query}` : "/budgets";
}

export function buildTransactionsPath(filters: TransactionFilters = {}): string {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.type) params.set("type", filters.type);
  if (filters.category) params.set("category", filters.category);
  if (filters.month) params.set("month", filters.month);
  if (filters.limit) params.set("limit", String(filters.limit));

  const query = params.toString();
  return query ? `/transactions?${query}` : "/transactions";
}

export function fetchDashboardSummary(month: string): Promise<DashboardSummary> {
  return apiFetch<DashboardSummary>(`/dashboard/summary?month=${month}`, {
    cache: "no-store",
  });
}

export function fetchBudgets(
  limit?: number,
  month?: string,
): Promise<Budget[]> {
  return apiFetch<Budget[]>(buildBudgetsPath(limit, month), {
    cache: "no-store",
  });
}

export function fetchTransactions(
  filters: TransactionFilters = {},
): Promise<Transaction[]> {
  return apiFetch<Transaction[]>(buildTransactionsPath(filters), {
    cache: "no-store",
  });
}

export function fetchConnections(): Promise<Connection[]> {
  return apiFetch<Connection[]>("/connections", { cache: "no-store" });
}

export async function safeServerFetch<T>(
  fetcher: () => Promise<T>,
): Promise<T | undefined> {
  try {
    return await fetcher();
  } catch {
    return undefined;
  }
}
