"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { NewTransactionDialog } from "./NewTransactionDialog";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { useTransactions } from "@/app/lib/hooks/use-transactions";
import { periodToMonth } from "@/app/lib/utils/month";
import type { TransactionFilters } from "@/app/lib/api/types";
import type {
  CategoryFilterValue,
  PeriodFilterValue,
  TransactionTypeFilterValue,
} from "@/app/types/transaction";
import {
  TRANSACTION_CATEGORY_ALL,
  TRANSACTION_TYPE_ALL,
} from "@/app/types/transaction";
import type { TransactionsPageContentProps } from "@/app/types/transaction";
import { TRANSACTIONS_PAGE_SIZE } from "../constants";
import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

export const TransactionsPageContent = ({
  month,
  initialTransactions,
}: TransactionsPageContentProps) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<TransactionTypeFilterValue>(
    TRANSACTION_TYPE_ALL,
  );
  const [category, setCategory] = useState<CategoryFilterValue>(
    TRANSACTION_CATEGORY_ALL,
  );
  const [period, setPeriod] = useState<PeriodFilterValue>("Este mês");
  const [page, setPage] = useState(1);

  const filters = useMemo<TransactionFilters>(
    () => ({
      search: search.trim() || undefined,
      type: type === TRANSACTION_TYPE_ALL ? undefined : type,
      category: category === TRANSACTION_CATEGORY_ALL ? undefined : category,
      month: periodToMonth(period) ?? month,
      page,
      pageSize: TRANSACTIONS_PAGE_SIZE,
    }),
    [search, type, category, period, month, page],
  );

  useEffect(() => {
    setPage(1);
  }, [search, type, category, period]);

  const isDefaultFilters =
    !filters.search &&
    !filters.type &&
    !filters.category &&
    filters.month === month &&
    page === 1;

  const { data, isLoading, isError } = useTransactions(filters, {
    initialData: isDefaultFilters ? initialTransactions : undefined,
  });

  const transactions = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Transações"
        description="Histórico de entradas e saídas"
        action={
          <NewTransactionDialog
            trigger={
              <Button size="lg">
                <Plus /> Nova transação
              </Button>
            }
          />
        }
      />
      <div className="flex flex-col gap-4">
        <TransactionsFilter
          search={search}
          type={type}
          category={category}
          period={period}
          onSearchChange={setSearch}
          onTypeChange={setType}
          onCategoryChange={setCategory}
          onPeriodChange={setPeriod}
        />
        <TransactionsTable
          transactions={transactions}
          isLoading={isLoading}
          isError={isError}
          pagination={{
            page,
            pageSize: TRANSACTIONS_PAGE_SIZE,
            total,
            totalPages,
            onPageChange: setPage,
          }}
        />
      </div>
    </div>
  );
};
