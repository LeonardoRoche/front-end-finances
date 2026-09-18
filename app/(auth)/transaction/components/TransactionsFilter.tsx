import { SearchIcon } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  categoryOptions,
  FilterOption,
  periodOptions,
  typeOptions,
} from "../constants";

const FilterSelect = ({
  label,
  options,
}: {
  label: string;
  options: FilterOption[];
}) => (
  <Select defaultValue={options[0].value}>
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

export const TransactionsFilter = () => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-xs">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          aria-label="Pesquisar transações"
          placeholder="Pesquisar transações"
          className="pl-8"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
        <FilterSelect label="Tipo" options={typeOptions} />
        <FilterSelect label="Categoria" options={categoryOptions} />
        <FilterSelect label="Período" options={periodOptions} />
      </div>
    </div>
  );
};
