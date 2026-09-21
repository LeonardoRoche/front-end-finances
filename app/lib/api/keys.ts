import type { TransactionFilters } from "./types";

export const queryKeys = {
  dashboard: {
    summary: (month?: string) => ["dashboard", "summary", month] as const,
  },
  transactions: {
    all: (filters?: TransactionFilters) =>
      ["transactions", filters ?? {}] as const,
  },
  budgets: {
    all: (limit?: number, month?: string) =>
      ["budgets", { limit, month }] as const,
  },
  pluggy: {
    connectToken: () => ["pluggy", "connect-token"] as const,
  },
  connections: {
    all: () => ["connections"] as const,
  },
};
