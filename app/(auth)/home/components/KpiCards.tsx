type KpiCardsProps = {
  TotalValue: string;
  monthlyRevenue: string;
  MonthlyExpenses: string;
};

export const KpiCards = ({
  TotalValue,
  monthlyRevenue,
  MonthlyExpenses,
}: KpiCardsProps) => {
  const ValueColor = (value: string) => {
    const AmountTotal = parseFloat(monthlyRevenue.replace(/[^\d.-]/g, ""));
    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));
    return numericValue <= AmountTotal ? "text-success" : "text-destructive";
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-lg bg-card p-4 shadow">
        <h3 className="text-sm font-medium text-muted-foreground">
          Saldo total
        </h3>
        <p className={`text-2xl font-semibold ${ValueColor(TotalValue)}`}>
          {TotalValue}
        </p>
      </div>
      <div className="rounded-lg bg-card p-4 shadow">
        <h3 className="text-sm font-medium text-muted-foreground">
          Receita Mensal
        </h3>
        <p className={`text-2xl font-semibold ${ValueColor(monthlyRevenue)}`}>
          {monthlyRevenue}
        </p>
      </div>
      <div className="rounded-lg bg-card p-4 shadow">
        <h3 className="text-sm font-medium text-muted-foreground">
          Despesas Mensais
        </h3>
        <p className={`text-2xl font-semibold ${ValueColor(MonthlyExpenses)}`}>
          {MonthlyExpenses}
        </p>
      </div>
    </div>
  );
};
