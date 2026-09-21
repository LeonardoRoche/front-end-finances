"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import { TransactionDialog } from "./TransactionDialog";

import type { NewTransactionDialogProps } from "@/app/types/transaction";

export type { NewTransactionDialogProps };

export const NewTransactionDialog = ({ trigger }: NewTransactionDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <TransactionDialog onSuccess={() => setOpen(false)} />
    </Dialog>
  );
};
