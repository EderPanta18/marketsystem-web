// shared/components/empty/EmptyState.tsx

"use client";

import { ReactNode } from "react";
import { cn } from "@/shared/utils";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Sin información disponible",
  description,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-2",
        "px-4 py-6 text-gray-700",
        className
      )}
    >
      {icon && <div className="mb-1 text-3xl">{icon}</div>}
      <p className="text-3xl font-semibold">{title}</p>
      {description && (
        <p className="text-xl text-gray-500 max-w-sm">{description}</p>
      )}
    </div>
  );
};

export default EmptyState;
