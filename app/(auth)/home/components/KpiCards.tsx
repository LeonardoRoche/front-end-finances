import {
  ArrowDownCircle,
  ArrowLeftRight,
  ArrowUpCircle,
  CreditCard,
  Wallet,
} from "lucide-react";
import { cn } from "cn";
import { formatarParaBRLCode } from "@/app/lib/utils/CurrencyFormater";
import { Skeleton } from "@/app/components/ui/skeleton";
import type { KpiCardsProps, MetricCardProps } from "@/app/types/home";

const MetricCard = ({
  label,
  value,
  hint,
  icon,
  accent,
  chip,
  valueClass,
}: MetricCardProps) => (
  <div
    className={cn(
      "surface-card relative overflow-hidden p-5",
      "bg-gradient-to-br",
      accent,
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p
          className={cn(
            "text-3xl font-bold tabular-nums tracking-tight",
            valueClass,
          )}
        >
          {value}
        </p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-xl",
          chip,
        )}
      >
        {icon}
      </div>
    </div>
  </div>
);

export const KpiCards = ({ summary }: KpiCardsProps) => {
  const hasAccounts = summary.bankAccounts.length > 0;
  const hasCards = summary.creditCards.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Saldo em conta"
          value={formatarParaBRLCode(summary.bankBalance)}
          hint={
            hasAccounts
              ? "Dinheiro disponível agora na conta"
              : "Sincronize em Conexões para ver saldo real"
          }
          icon={<Wallet size={18} />}
          accent="from-emerald-500/15 to-teal-500/5"
          chip="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
          valueClass="text-emerald-700 dark:text-emerald-300"
        />

        <MetricCard
          label="Saldo do mês"
          value={formatarParaBRLCode(summary.monthlyBalance)}
          hint="Saldo em conta + salário do trabalho"
          icon={<ArrowUpCircle size={18} />}
          accent="from-sky-500/15 to-blue-500/5"
          chip="bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300"
          valueClass="text-sky-700 dark:text-sky-300"
        />

        <MetricCard
          label="Gastos do mês"
          value={formatarParaBRLCode(summary.monthlyExpenses)}
          hint="Cartão + débito — sem PIX para pessoas"
          icon={<ArrowDownCircle size={18} />}
          accent="from-rose-500/15 to-orange-500/5"
          chip="bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
          valueClass="text-rose-700 dark:text-rose-300"
        />

        <MetricCard
          label="PIX / TED enviados"
          value={formatarParaBRLCode(summary.monthlyPeerTransfers)}
          hint="Transferências para pessoas"
          icon={<ArrowLeftRight size={18} />}
          accent="from-amber-500/15 to-yellow-500/5"
          chip="bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
          valueClass="text-amber-800 dark:text-amber-300"
        />
      </div>

      {hasCards ? (
        <div className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">Cartões de crédito</h3>
              <p className="text-sm text-muted-foreground">
                Fatura aberta e limite disponível via Open Finance
              </p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
              <CreditCard size={18} />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Fatura aberta</p>
              <p className="text-lg font-bold tabular-nums">
                {formatarParaBRLCode(summary.creditCardTotalInvoice)}
              </p>
            </div>
            <div className="rounded-xl bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Limite total</p>
              <p className="text-lg font-bold tabular-nums">
                {formatarParaBRLCode(summary.creditCardTotalLimit)}
              </p>
            </div>
            <div className="rounded-xl bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">
                Gasto no cartão (mês)
              </p>
              <p className="text-lg font-bold tabular-nums">
                {formatarParaBRLCode(summary.monthlyCardSpending)}
              </p>
            </div>
            <div className="rounded-xl bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Fatura paga (mês)</p>
              <p className="text-lg font-bold tabular-nums">
                {formatarParaBRLCode(summary.monthlyCreditCardBillPaid)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {summary.creditCards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-border/70 bg-card p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{card.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {card.brand ?? "Cartão"} · vence {card.dueDate ?? "—"}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                    {card.utilizationPercent}% usado
                  </span>
                </div>

                <div className="mb-2 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Fatura aberta
                    </p>
                    <p className="text-xl font-bold tabular-nums">
                      {formatarParaBRLCode(card.currentInvoice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Limite</p>
                    <p className="text-sm font-medium tabular-nums">
                      {formatarParaBRLCode(card.creditLimit)}
                    </p>
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      card.utilizationPercent >= 80
                        ? "bg-rose-500"
                        : "bg-amber-500",
                    )}
                    style={{
                      width: `${Math.min(card.utilizationPercent, 100)}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Disponível: {formatarParaBRLCode(card.availableLimit)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>
      )}
    </div>
  );
};
