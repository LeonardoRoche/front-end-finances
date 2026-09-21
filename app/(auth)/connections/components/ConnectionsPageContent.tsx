"use client";



import { Landmark, RefreshCw, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/app/components/ui/card";

import { Skeleton } from "@/app/components/ui/skeleton";

import { Button } from "@/app/components/ui/button";

import { PageHeader } from "@/app/components/layout/PageHeader";

import { EmptyState } from "@/app/components/layout/EmptyState";

import { ConnectionStatusBadge } from "@/app/components/ui/connection-status-badge";

import { PluggyConnectButton } from "@/app/components/pluggy/PluggyConnectButton";

import { useConnections } from "@/app/lib/hooks/use-connections";

import { useSyncPluggy } from "@/app/lib/hooks/use-sync-pluggy";
import { useRecategorize } from "@/app/lib/hooks/use-recategorize";
import { Sparkles } from "lucide-react";

import { formatarDataAbreviada } from "@/app/lib/utils/DateFormatter";



export const ConnectionsPageContent = () => {

  const { data: connections = [], isLoading, isError, refetch } =

    useConnections();

  const syncPluggy = useSyncPluggy();
  const recategorize = useRecategorize();



  async function handleSync() {

    await syncPluggy.mutateAsync();

    await refetch();

  }



  return (

    <div className="flex flex-col gap-6">

      <PageHeader

        title="Conexões"

        description="Open Finance via Pluggy — importação automática de transações"

        action={

          <div className="flex flex-wrap gap-2">

            <Button

              variant="outline"

              size="lg"

              onClick={handleSync}

              disabled={syncPluggy.isPending}

            >

              <RefreshCw

                className={syncPluggy.isPending ? "animate-spin" : undefined}

              />

              {syncPluggy.isPending ? "Sincronizando..." : "Importar da Pluggy"}

            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => recategorize.mutate()}
              disabled={recategorize.isPending}
            >
              <Sparkles
                className={recategorize.isPending ? "animate-pulse" : undefined}
              />
              {recategorize.isPending
                ? "Recategorizando..."
                : "Recategorizar com IA"}
            </Button>

            <PluggyConnectButton

              label="Conectar banco"

              onConnected={() => refetch()}

            />

          </div>

        }

      />



      <div className="flex items-start gap-3 rounded-xl border bg-card p-4">

        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">

          <ShieldCheck size={18} />

        </div>

        <div>

          <p className="text-sm font-medium">Integração segura</p>

          <p className="text-sm text-muted-foreground">

            Suas credenciais bancárias não passam por este app. A Pluggy

            conecta via Open Finance e sincroniza transações com categorias

            mapeadas automaticamente.

          </p>

        </div>

      </div>



      {syncPluggy.isSuccess ? (

        <div className="rounded-lg border border-success/30 bg-success/5 px-4 py-3 text-sm">

          Importação concluída:{" "}

          <strong>{syncPluggy.data.transactionsImported}</strong> novas,{" "}

          <strong>{syncPluggy.data.transactionsUpdated}</strong> atualizadas,{" "}

          <strong>{syncPluggy.data.transactionsSkipped}</strong> sem alteração.{" "}

          {syncPluggy.data.itemsSynced} conexão(ões) processada(s)

          {syncPluggy.data.invalidConnectionsSkipped > 0

            ? ` · ${syncPluggy.data.invalidConnectionsSkipped} conexão(ões) de teste ignorada(s)`

            : ""}

          .

        </div>

      ) : null}



      {recategorize.isSuccess ? (

        <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm">

          Recategorização concluída:{" "}

          <strong>{recategorize.data.updated}</strong> de{" "}

          <strong>{recategorize.data.processed}</strong> transações atualizadas

          {recategorize.data.aiEnabled

            ? " com validação por IA."

            : " (regras locais — configure OPENAI_API_KEY para IA)."}

        </div>

      ) : null}



      {recategorize.isError ? (

        <p className="text-sm text-destructive">

          Não foi possível recategorizar as transações.

        </p>

      ) : null}



      {syncPluggy.isError ? (

        <p className="text-sm text-destructive">

          Não foi possível importar os dados da Pluggy.

        </p>

      ) : null}



      {isError ? (

        <p className="text-sm text-destructive">

          Não foi possível carregar as conexões.

        </p>

      ) : isLoading ? (

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {Array.from({ length: 2 }).map((_, index) => (

            <Skeleton key={index} className="h-36 rounded-xl" />

          ))}

        </div>

      ) : connections.length === 0 ? (

        <EmptyState

          icon={<Landmark size={22} />}

          title="Nenhuma conta conectada"

          description='Se você já tem dados no dashboard da Pluggy, clique em "Importar da Pluggy". Ou conecte um banco novo pelo widget.'

          action={

            <div className="flex flex-wrap justify-center gap-2">

              <Button

                variant="outline"

                onClick={handleSync}

                disabled={syncPluggy.isPending}

              >

                <RefreshCw

                  className={syncPluggy.isPending ? "animate-spin" : undefined}

                />

                Importar da Pluggy

              </Button>

              <PluggyConnectButton onConnected={() => refetch()} />

            </div>

          }

        />

      ) : (

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {connections.map((connection) => (

            <Card

              key={connection.id}

              className="overflow-hidden transition-shadow hover:shadow-md"

            >

              <CardContent className="flex flex-col gap-4 p-5">

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">

                      <Landmark size={20} />

                    </div>

                    <div>

                      <h3 className="font-medium">{connection.connectorName}</h3>

                      <p className="text-xs text-muted-foreground">

                        Open Finance · Pluggy

                      </p>

                    </div>

                  </div>

                  <ConnectionStatusBadge status={connection.status} />

                </div>



                <div className="grid gap-2 rounded-lg bg-muted/40 p-3 text-sm">

                  <div className="flex items-center justify-between gap-2">

                    <span className="text-muted-foreground">Item ID</span>

                    <span className="font-mono text-xs">

                      {connection.pluggyItemId.slice(0, 8)}…

                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-2">

                    <span className="text-muted-foreground">Conectado em</span>

                    <span>{formatarDataAbreviada(connection.createdAt)}</span>

                  </div>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      )}

    </div>

  );

};

