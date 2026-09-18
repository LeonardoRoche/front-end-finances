import type { Metadata } from "next";
import { TransactionsPageContent } from "./components/TransactionsPageContent";

export const metadata: Metadata = { title: "Transações" };

export default function TransactionPage() {
  return <TransactionsPageContent />;
}
