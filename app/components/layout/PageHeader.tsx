import type { PageHeaderProps } from "@/app/types/layout";

export type { PageHeaderProps };

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/80 px-5 py-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </header>
  );
};
