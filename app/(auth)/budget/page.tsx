import type { Metadata } from "next";
import { fetchBudgets, safeServerFetch } from "@/app/lib/api/queries";
import { getCurrentMonth } from "@/app/lib/utils/month";
import { BudgetPageContent } from "./components/BudgetPageContent";

export const metadata: Metadata = { title: "Orçamentos" };

export default async function Page() {
  const month = getCurrentMonth();
  const initialBudgets = await safeServerFetch(() => fetchBudgets(undefined, month));

  return (
    <BudgetPageContent month={month} initialBudgets={initialBudgets} />
  );
}
