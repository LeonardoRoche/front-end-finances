import { Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

export const TransactionsPageContent = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Transações"
        description="Histórico de entradas e saídas"
        action={
          <Button size="lg">
            <Plus /> Nova transação
          </Button>
        }
      />
      <div className="flex flex-col gap-4">
        <TransactionsFilter />
        <TransactionsTable />
      </div>
    </div>
  );
};
