import { SelectValues } from "../constants";
import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

export const TransactionsPageContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <TransactionsFilter SelectValues={SelectValues} />
      </div>
      <div className="overflow-x-auto">
        <TransactionsTable />
      </div>
    </div>
  );
};
