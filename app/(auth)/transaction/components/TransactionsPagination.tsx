"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import type { TransactionsPaginationProps } from "@/app/types/transaction";

export const TransactionsPagination = ({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
}: TransactionsPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 border-t border-border/80 bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Mostrando{" "}
        <span className="font-medium text-foreground">
          {start}-{end}
        </span>{" "}
        de <span className="font-medium text-foreground">{total}</span>
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Página anterior"
        >
          <ChevronLeft />
          Anterior
        </Button>

        <span className="min-w-24 text-center text-sm text-muted-foreground">
          Página {page} de {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Próxima página"
        >
          Próxima
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
