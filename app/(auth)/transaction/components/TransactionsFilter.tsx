"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import type { TransactionsFilterProps } from "@/app/types/transaction";
import {
  categoryOptions,
  periodOptions,
  typeOptions,
} from "../constants";

export type { TransactionsFilterProps };

const FilterSelect = <T extends string>({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onValueChange: (value: T) => void;
}) => (
  <Select
    value={value}
    onValueChange={(nextValue) => nextValue && onValueChange(nextValue as T)}
  >
    <SelectTrigger aria-label={label}>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {options.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const TransactionsFilter = ({
  search,
  type,
  category,
  period,
  onSearchChange,
  onTypeChange,
  onCategoryChange,
  onPeriodChange,
}: TransactionsFilterProps) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-xs">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          aria-label="Pesquisar transações"
          placeholder="Pesquisar transações"
          className="pl-8"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
        <FilterSelect
          label="Tipo"
          options={typeOptions}
          value={type}
          onValueChange={onTypeChange}
        />
        <FilterSelect
          label="Categoria"
          options={categoryOptions}
          value={category}
          onValueChange={onCategoryChange}
        />
        <FilterSelect
          label="Período"
          options={periodOptions}
          value={period}
          onValueChange={onPeriodChange}
        />
      </div>
    </div>
  );
};
