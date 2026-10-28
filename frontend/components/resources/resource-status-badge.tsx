import React from "react";
import { ResourceStatus } from "@/types/resource";
import { cn } from "@/lib/utils";

interface ResourceStatusBadgeProps {
  status: ResourceStatus;
  className?: string;
  showDot?: boolean;
}

export function ResourceStatusBadge({
  status,
  className,
  showDot = true,
}: ResourceStatusBadgeProps) {
  const configs: Record<
    ResourceStatus,
    { label: string; bg: string; text: string; border: string; dot: string }
  > = {
    Available: {
      label: "Available",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
    },
    Unavailable: {
      label: "In Use / Checked Out",
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-300",
      dot: "bg-slate-500",
    },
    Maintenance: {
      label: "Maintenance",
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-200",
      dot: "bg-amber-500",
    },
    Retired: {
      label: "Decommissioned",
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      dot: "bg-rose-400",
    },
  };

  const config = configs[status] || configs.Available;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {showDot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full animate-pulse", config.dot)}
          aria-hidden="true"
        />
      )}
      {config.label}
    </span>
  );
}
