import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";

type KpiCardsProps = {
  totalValue: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
};

export const KpiCards = ({
  totalValue,
  monthlyRevenue,
  monthlyExpenses,
}: KpiCardsProps) => {
  const kpis = [
    {
      label: "Saldo total",
      value: totalValue,
      icon: <Wallet size={16} />,
      chip:
        totalValue >= 0
          ? "bg-success/10 text-success"
          : "bg-destructive/10 text-destructive",
    },
    {
      label: "Receita mensal",
      value: monthlyRevenue,
      icon: <TrendingUp size={16} />,
      chip: "bg-success/10 text-success",
    },
    {
      label: "Despesas mensais",
      value: monthlyExpenses,
      icon: <TrendingDown size={16} />,
      chip: "bg-destructive/10 text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </h3>
              <div
                className={`flex size-8 items-center justify-center rounded-full ${kpi.chip}`}
              >
                {kpi.icon}
              </div>
            </div>
            <p
              className={`text-2xl font-semibold tabular-nums ${kpi.value < 0 ? "text-destructive" : ""}`}
            >
              {formatarParaBRLCode(kpi.value)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
