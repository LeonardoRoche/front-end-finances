import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { SelectValues } from "../constants";

export const TransactionsFilter = ({
  SelectValues,
}: {
  SelectValues: SelectValues[];
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Input
          type="text"
          placeholder="Pesquisar transações"
          className="w-1/6 rounded-md border border-border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="flex items-center gap-2">
          <Select defaultValue={SelectValues[0].value}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {SelectValues.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
