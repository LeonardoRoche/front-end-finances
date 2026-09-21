import type { Metadata } from "next";
import {
  fetchBudgets,
  fetchDashboardSummary,
  fetchTransactions,
  safeServerFetch,
} from "@/app/lib/api/queries";
import { getCurrentMonth } from "@/app/lib/utils/month";
import { HomePageContent } from "./components/HomePageContent";

export const metadata: Metadata = { title: "Visão geral" };

export default async function HomePage() {
  const month = getCurrentMonth();

  const [initialSummary, initialTransactions, initialBudgets] =
    await Promise.all([
      safeServerFetch(() => fetchDashboardSummary(month)),
      safeServerFetch(() => fetchTransactions({ limit: 5, month })),
      safeServerFetch(() => fetchBudgets(3, month)),
    ]);

  return (
    <HomePageContent
      month={month}
      initialSummary={initialSummary}
      initialTransactions={initialTransactions}
      initialBudgets={initialBudgets}
    />
  );
}
