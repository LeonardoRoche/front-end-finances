import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { KpiCards } from "./KpiCards";
import { Transactions } from "./Transactions";
import { Budgets } from "./Budgets";

const SectionHeader = ({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) => (
  <div className="mb-3 flex items-center justify-between">
    <h2 className="text-base font-semibold">{title}</h2>
    <Link href={href} className="text-sm text-primary hover:underline">
      {linkLabel}
    </Link>
  </div>
);

export const HomePageContent = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Visão geral"
        description="Setembro 2026"
        action={
          <Button size="lg">
            <PlusIcon /> Nova transação
          </Button>
        }
      />
      <KpiCards
        totalValue={1000}
        monthlyRevenue={5000}
        monthlyExpenses={6000}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section>
          <SectionHeader
            title="Últimas transações"
            href="/transaction"
            linkLabel="Ver todas"
          />
          <Card className="gap-0 py-0">
            <CardContent>
              <Transactions
                title="Supermercado Extra"
                amount={284.3}
                date="2026-09-14"
                type="Food"
              />
              <Transactions
                title="Salário"
                amount={5800.0}
                date="2026-09-05"
                type="Income"
              />
            </CardContent>
          </Card>
        </section>
        <section>
          <SectionHeader
            title="Orçamentos"
            href="/budget"
            linkLabel="Ver todos"
          />
          <Card className="gap-0 py-0">
            <CardContent>
              <Budgets type="Food" amount={284.3} limit={800} />
              <Budgets type="Fixed Expenses" amount={1200} limit={1500} />
              <Budgets type="Subscriptions" amount={120} limit={100} />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
