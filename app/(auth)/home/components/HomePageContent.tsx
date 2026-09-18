import { Button } from "@/app/components/ui/button";
import { PlusIcon } from "lucide-react";
import { KpiCards } from "./KpiCards";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import Link from "next/link";
import { Transactions } from "./Transactions";
import { Budgets } from "./Budgets";

export const HomePageContent = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Visão geral</h2>
          <h2 className="text-lg">Outubro</h2>
        </div>
        <Button variant="outline" size="lg">
          <PlusIcon className="mr-2" /> Nova transação
        </Button>
      </div>
      <div>
        <KpiCards
          TotalValue={formatarParaBRLCode(1000)}
          monthlyRevenue={formatarParaBRLCode(5000)}
          MonthlyExpenses={formatarParaBRLCode(6000)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2>Últimas Transações</h2>
            <Link href="/transactions" className="text-primary hover:underline">
              Ver todas
            </Link>
          </div>

          <div className="rounded-lg bg-card px-4 shadow">
            <Transactions
              Title="Supermercado Extra"
              Amount={284.3}
              Date="2023-09-14"
              Type="Food"
            />
            <Transactions
              Title="Salário"
              Amount={5800.0}
              Date="2023-09-05"
              Type="Income"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h2>Orçamentos</h2>
            <Link href="/transactions" className="text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="rounded-lg bg-card px-4 shadow">
            <Budgets Type="Food" Amount={1000} />
            <Budgets Type="Income" Amount={5000} />
            <Budgets Type="Fixed Expenses" Amount={6000} />
            <Budgets Type="Subscriptions" Amount={100} />
          </div>
        </div>
      </div>
    </div>
  );
};
