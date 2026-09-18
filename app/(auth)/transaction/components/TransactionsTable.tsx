import { Card } from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import { formatarDataAbreviada } from "@/app/lib/utils/DateFormatter";
import { transactions } from "../constants";

export const TransactionsTable = () => {
  return (
    <Card className="gap-0 py-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Descrição</TableHead>
            <TableHead className="hidden sm:table-cell">Categoria</TableHead>
            <TableHead className="hidden md:table-cell">Conta</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="pr-4 text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((item) => {
            const isIncome = item.amount > 0;

            return (
              <TableRow key={item.id}>
                <TableCell className="pl-4 font-medium">
                  {item.description}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.category}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.account}
                </TableCell>
                <TableCell>{formatarDataAbreviada(item.date)}</TableCell>
                <TableCell
                  className={`pr-4 text-right font-medium tabular-nums ${isIncome ? "text-success" : ""}`}
                >
                  {isIncome ? "+" : "-"}
                  {formatarParaBRLCode(Math.abs(item.amount))}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};
