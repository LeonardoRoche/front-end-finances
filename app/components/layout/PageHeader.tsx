type PageHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </header>
  );
};
