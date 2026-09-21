import type { ReactNode } from "react";

export type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};
