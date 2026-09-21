import type { EmptyStateProps } from "@/app/types/layout";

export type { EmptyStateProps };

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-muted-foreground/30 bg-card px-6 py-12 text-center">
    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <div className="flex max-w-md flex-col gap-2">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {action}
  </div>
);
