import type { ConnectionStatus } from "@/app/lib/api/types";

export type PluggyConnectButtonProps = {
  label?: string;
  onConnected?: () => void;
};

export type ConnectionStatusBadgeProps = {
  status: ConnectionStatus | string;
};
