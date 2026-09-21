"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { useConnectToken } from "@/app/lib/hooks/use-connect-token";
import { useCreateConnection } from "@/app/lib/hooks/use-connections";
import type { PluggyConnectButtonProps } from "@/app/types/connections";

export type { PluggyConnectButtonProps };

export const PluggyConnectButton = ({
  label = "Conectar banco",
  onConnected,
}: PluggyConnectButtonProps) => {
  const [error, setError] = useState<string | null>(null);
  const connectToken = useConnectToken();
  const createConnection = useCreateConnection();

  async function handleConnect() {
    setError(null);

    try {
      const { accessToken } = await connectToken.mutateAsync();
      const { PluggyConnect } = await import("pluggy-connect-sdk");

      const pluggyConnect = new PluggyConnect({
        connectToken: accessToken,
        onSuccess: async ({ item }) => {
          await createConnection.mutateAsync({
            pluggyItemId: item.id,
            status: item.status,
            connectorName: item.connector?.name ?? "Banco conectado",
          });
          onConnected?.();
        },
        onError: (pluggyError) => {
          setError(pluggyError.message ?? "Erro ao conectar banco.");
        },
      });

      await pluggyConnect.init();
    } catch (connectError) {
      setError(
        connectError instanceof Error
          ? connectError.message
          : "Erro ao iniciar conexão.",
      );
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <Button
        size="lg"
        onClick={handleConnect}
        disabled={connectToken.isPending || createConnection.isPending}
      >
        {connectToken.isPending || createConnection.isPending
          ? "Conectando..."
          : label}
      </Button>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
};
