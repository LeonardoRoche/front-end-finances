import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

export const TransactionsTable = () => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Descrição</TableHead>
          <TableHead className="w-[100px]">Categoria</TableHead>
          <TableHead className="w-[100px]">Conta</TableHead>
          <TableHead className="w-[100px]">Data</TableHead>
          <TableHead className="w-[100px]">Valor</TableHead>
          <TableHead className="w-[100px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Supermercado</TableCell>
          <TableCell>Alimentação</TableCell>
          <TableCell>Cartão de crédito</TableCell>
          <TableCell>18/09/2026</TableCell>
          <TableCell>R$ 250,00</TableCell>
          <TableCell>—</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
