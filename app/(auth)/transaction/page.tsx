import type { Metadata } from "next";
import { fetchTransactions, safeServerFetch } from "@/app/lib/api/queries";
import { getCurrentMonth } from "@/app/lib/utils/month";
import { TRANSACTIONS_PAGE_SIZE } from "./constants";
import { TransactionsPageContent } from "./components/TransactionsPageContent";

export const metadata: Metadata = { title: "Transações" };

export default async function TransactionPage() {
  const month = getCurrentMonth();
  const initialTransactions = await safeServerFetch(() =>
    fetchTransactions({ month, page: 1, pageSize: TRANSACTIONS_PAGE_SIZE }),
  );

  return (
    <TransactionsPageContent
      month={month}
      initialTransactions={initialTransactions}
    />
  );
}
