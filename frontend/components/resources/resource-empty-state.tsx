import React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceEmptyStateProps {
  searchQuery?: string;
  category?: string;
  status?: string;
  onReset: () => void;
}

export function ResourceEmptyState({
  searchQuery,
  category,
  status,
  onReset,
}: ResourceEmptyStateProps) {
  const hasActiveFilters = Boolean(
    (searchQuery && searchQuery.trim() !== "") ||
    (category && category !== "All") ||
    (status && status !== "All")
  );

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-4">
        <SearchX className="h-8 w-8 text-slate-400" aria-hidden="true" />
      </div>

      <h3 className="text-lg font-semibold text-slate-900">
        No resources found
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {hasActiveFilters ? (
          <>
            No catalogue items matched your current filter selection
            {searchQuery ? ` for "${searchQuery}"` : ""}. Try adjusting your keywords, expanding categories, or resetting filters.
          </>
        ) : (
          "The catalogue is currently empty. Please check back later or contact your department administrator."
        )}
      </p>

      {hasActiveFilters && (
        <div className="mt-6">
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="inline-flex items-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset all filters
          </Button>
        </div>
      )}
    </div>
  );
}
