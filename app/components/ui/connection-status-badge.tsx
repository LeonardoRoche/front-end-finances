import { cn } from "cn";

const statusStyles: Record<string, string> = {
  UPDATED: "bg-success/10 text-success",
  LOGIN_ERROR: "bg-destructive/10 text-destructive",
  OUTDATED: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  WAITING_USER_INPUT: "bg-primary/10 text-primary",
};

const statusLabels: Record<string, string> = {
  UPDATED: "Ativa",
  LOGIN_ERROR: "Erro de login",
  OUTDATED: "Desatualizada",
  WAITING_USER_INPUT: "Aguardando ação",
};

import type { ConnectionStatusBadgeProps } from "@/app/types/connections";

export type { ConnectionStatusBadgeProps };

export const ConnectionStatusBadge = ({
  status,
}: ConnectionStatusBadgeProps) => (
  <span
    className={cn(
      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
      statusStyles[status] ?? "bg-muted text-muted-foreground",
    )}
  >
    {statusLabels[status] ?? status}
  </span>
);
