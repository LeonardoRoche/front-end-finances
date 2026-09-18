import type { Metadata } from "next";
import { BudgetPageContent } from "./components/BudgetPageContent";

export const metadata: Metadata = { title: "Orçamentos" };

export default function Page() {
  return <BudgetPageContent />;
}
