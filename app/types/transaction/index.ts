import type { ReactElement } from "react";
import type {
  Transaction,
  TransactionTypeFilter,
} from "@/app/lib/api/types";

export type FilterOption<T extends string = string> = {
  value: T;
  label: string;
};

export const TRANSACTION_TYPE_ALL = "Todos os tipos" as const;
export const TRANSACTION_CATEGORY_ALL = "Todas as categorias" as const;

export type TransactionTypeFilterValue =
  | typeof TRANSACTION_TYPE_ALL
  | TransactionTypeFilter;

export type CategoryFilterValue =
  | typeof TRANSACTION_CATEGORY_ALL
  | Exclude<string, typeof TRANSACTION_CATEGORY_ALL>;

export type PeriodFilterValue =
  | "Este mês"
  | "Mês passado"
  | "Últimos 3 meses"
  | "Este ano";

export type TransactionPageFilterState = {
  search: string;
  type: TransactionTypeFilterValue;
  category: CategoryFilterValue;
  period: PeriodFilterValue;
};

export type TransactionsTableProps = {
  transactions: Transaction[];
  isLoading?: boolean;
  isError?: boolean;
};

export type TransactionsFilterProps = {
  search: string;
  type: TransactionTypeFilterValue;
  category: CategoryFilterValue;
  period: PeriodFilterValue;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: TransactionTypeFilterValue) => void;
  onCategoryChange: (value: CategoryFilterValue) => void;
  onPeriodChange: (value: PeriodFilterValue) => void;
};

export type TransactionDialogProps = {
  transaction?: Transaction;
  onSuccess?: () => void;
  onDelete?: () => void;
};

export type NewTransactionDialogProps = {
  trigger: ReactElement;
};
