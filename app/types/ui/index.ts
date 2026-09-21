export type CategoryBadgeProps = {
  category: string;
  className?: string;
  showIcon?: boolean;
};

export type ConfirmDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  isPending?: boolean;
};
