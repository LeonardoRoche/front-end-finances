import { budgetCategoryOptions } from "@/app/lib/categories";
import type {
  FilterOption,
  PeriodFilterValue,
  TransactionTypeFilterValue,
} from "@/app/types/transaction";
import {
  TRANSACTION_CATEGORY_ALL,
  TRANSACTION_TYPE_ALL,
} from "@/app/types/transaction";

export type { FilterOption };

export const typeOptions: FilterOption<TransactionTypeFilterValue>[] = [
  { value: TRANSACTION_TYPE_ALL, label: "Todos" },
  { value: "Saídas", label: "Gastos" },
  { value: "Transferências", label: "Transferências" },
  { value: "Entradas", label: "Entradas" },
];

export const categoryOptions: FilterOption<string>[] = [
  { value: TRANSACTION_CATEGORY_ALL, label: "Todas categorias" },
  ...budgetCategoryOptions.map((category) => ({
    value: category,
    label: category,
  })),
];

export const TRANSACTIONS_PAGE_SIZE = 10;

export const periodOptions: FilterOption<PeriodFilterValue>[] = [
  { value: "Este mês", label: "Este mês" },
  { value: "Mês passado", label: "Mês passado" },
  { value: "Últimos 3 meses", label: "Últimos 3 meses" },
  { value: "Este ano", label: "Este ano" },
];
