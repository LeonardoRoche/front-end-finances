"use client";

import Link from "next/link";
import { Landmark, RefreshCw } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useConnections } from "@/app/lib/hooks/use-connections";
import { useSyncPluggy } from "@/app/lib/hooks/use-sync-pluggy";

export const OpenFinanceBanner = () => {
  const { data: connections = [] } = useConnections();
  const syncPluggy = useSyncPluggy();

  if (connections.length === 0) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Landmark size={18} />
          </div>
          <div>
            <p className="text-sm font-medium">Conecte sua conta bancária</p>
            <p className="text-sm text-muted-foreground">
              Sincronize transações automaticamente via Open Finance (Pluggy).
            </p>
          </div>
        </div>
        <Button render={<Link href="/connections" />} nativeButton={false}>
          Conectar banco
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
          <Landmark size={18} />
        </div>
        <div>
          <p className="text-sm font-medium">
            {connections.length} conta(s) conectada(s)
          </p>
          <p className="text-sm text-muted-foreground">
            Dados importados via Pluggy · categorias mapeadas automaticamente
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => syncPluggy.mutate()}
        disabled={syncPluggy.isPending}
      >
        <RefreshCw
          className={syncPluggy.isPending ? "animate-spin" : undefined}
        />
        {syncPluggy.isPending ? "Sincronizando..." : "Atualizar dados"}
      </Button>
    </div>
  );
};
