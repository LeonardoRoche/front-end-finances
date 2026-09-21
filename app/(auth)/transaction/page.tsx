import type { Metadata } from "next";
import { fetchTransactions, safeServerFetch } from "@/app/lib/api/queries";
import { getCurrentMonth } from "@/app/lib/utils/month";
import { TransactionsPageContent } from "./components/TransactionsPageContent";

export const metadata: Metadata = { title: "Transações" };

export default async function TransactionPage() {
  const month = getCurrentMonth();
  const initialTransactions = await safeServerFetch(() =>
    fetchTransactions({ month }),
  );

  return (
    <TransactionsPageContent
      month={month}
      initialTransactions={initialTransactions}
    />
  );
}
