import { cn } from "cn";
import { getCategoryConfig } from "@/app/lib/categories";

import type { CategoryBadgeProps } from "@/app/types/ui";

export type { CategoryBadgeProps };

export const CategoryBadge = ({
  category,
  className,
  showIcon = true,
}: CategoryBadgeProps) => {
  const config = getCategoryConfig(category);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        config.iconBg,
        config.iconColor,
        "border-current/15",
        className,
      )}
    >
      {showIcon ? (
        <span className="flex size-4 items-center justify-center [&>svg]:size-3">
          {config.icon}
        </span>
      ) : null}
      {config.label}
    </span>
  );
};
