"use client";

import { Button } from "@/app/components/ui/button";
import { NewTransactionDialog } from "@/app/(auth)/transaction/components/NewTransactionDialog";
import { Skeleton } from "@/app/components/ui/skeleton";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { OpenFinanceBanner } from "@/app/components/layout/OpenFinanceBanner";
import { useBudgets } from "@/app/lib/hooks/use-budgets";
import { useDashboardSummary } from "@/app/lib/hooks/use-dashboard-summary";
import { useTransactions } from "@/app/lib/hooks/use-transactions";
import { formatMonthLabel } from "@/app/lib/utils/month";
import type {
  HomePageContentProps,
  ListSkeletonProps,
  SectionHeaderProps,
} from "@/app/types/home";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { KpiCards } from "./KpiCards";
import { Transactions } from "./Transactions";
import { Budgets } from "./Budgets";

const SectionHeader = ({ title, href, linkLabel }: SectionHeaderProps) => (
  <div className="mb-3 flex items-center justify-between">
    <h2 className="text-base font-semibold">{title}</h2>
    <Link href={href} className="text-sm text-primary hover:underline">
      {linkLabel}
    </Link>
  </div>
);

const ListSkeleton = ({ rows = 3 }: ListSkeletonProps) => (
  <div className="flex flex-col gap-3 py-3">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);

export const HomePageContent = ({
  month,
  initialSummary,
  initialTransactions,
  initialBudgets,
}: HomePageContentProps) => {
  const { data: summary, isLoading: isSummaryLoading } = useDashboardSummary(
    month,
    { initialData: initialSummary },
  );
  const { data: transactions = [], isLoading: isTransactionsLoading } =
    useTransactions(
      { limit: 5, month },
      { initialData: initialTransactions },
    );
  const { data: budgets = [], isLoading: isBudgetsLoading } = useBudgets(
    3,
    month,
    { initialData: initialBudgets },
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Visão geral"
        description={formatMonthLabel(month)}
        action={
          <NewTransactionDialog
            trigger={
              <Button size="lg">
                <PlusIcon /> Nova transação
              </Button>
            }
          />
        }
      />

      <OpenFinanceBanner />

      {isSummaryLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        summary ? <KpiCards summary={summary} /> : null
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section>
          <SectionHeader
            title="Últimas transações"
            href="/transaction"
            linkLabel="Ver todas"
          />
          <div className="surface-card overflow-hidden">
            <div className="px-4 py-3">
              {isTransactionsLoading ? (
                <ListSkeleton rows={2} />
              ) : transactions.length === 0 ? (
                <p className="py-6 text-sm text-muted-foreground">
                  Nenhuma transação encontrada.
                </p>
              ) : (
                transactions.map((transaction) => (
                  <Transactions
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        <section>
          <SectionHeader
            title="Orçamentos"
            href="/budget"
            linkLabel="Ver todos"
          />
          <div className="surface-card overflow-hidden">
            <div className="px-4 py-3">
              {isBudgetsLoading ? (
                <ListSkeleton rows={3} />
              ) : budgets.length === 0 ? (
                <p className="py-6 text-sm text-muted-foreground">
                  Nenhum orçamento cadastrado.
                </p>
              ) : (
                budgets.map((budget) => (
                  <Budgets key={budget.id} budget={budget} />
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
