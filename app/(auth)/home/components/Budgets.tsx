import { categoryConfig, TransactionProps } from "./Transactions";

export const Budgets = ({
  Type,
  Amount,
}: Pick<TransactionProps, "Type" | "Amount">) => {
  const label = categoryConfig[Type].label;

  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <div>
          <h3 className="text-sm font-medium">{label}</h3>
          <p className="bg-emerald-400 w-full h-2 rounded-full"></p>
        </div>
      </div>
      <p className={`text-sm font-semibold`}>
        R$ {Amount.toFixed(2).replace(".", ",")} / R$ 1000,00
      </p>
    </div>
  );
};
