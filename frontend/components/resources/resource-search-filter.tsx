import React from "react";
import { Search, X, Filter, RotateCcw } from "lucide-react";
import {
  ResourceCategory,
  ResourceStatus,
  RESOURCE_CATEGORIES,
  RESOURCE_STATUSES,
} from "@/types/resource";
import { Button } from "@/components/ui/button";

interface ResourceSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ResourceCategory | "All";
  onCategoryChange: (category: ResourceCategory | "All") => void;
  selectedStatus: ResourceStatus | "All";
  onStatusChange: (status: ResourceStatus | "All") => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
  categoryCounts?: Record<string, number>;
}

export function ResourceSearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  totalCount,
  filteredCount,
  categoryCounts = {},
}: ResourceSearchFilterProps) {
  const isFiltered = Boolean(
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedStatus !== "All"
  );

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      {/* Search Input Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by equipment name, department, lab location, or keyword..."
            aria-label="Search resources"
            className="w-full rounded-lg border border-slate-300 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search query"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Status Dropdown Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="status-select" className="shrink-0 text-xs font-medium text-slate-500">
            Status:
          </label>
          <select
            id="status-select"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as ResourceStatus | "All")}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
          >
            <option value="All">All Statuses</option>
            {RESOURCE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {isFiltered && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-9 shrink-0 gap-1 px-2.5 text-xs text-slate-600 hover:text-slate-900"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div>
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="mr-1 text-xs font-medium text-slate-500">Categories:</span>
          <button
            type="button"
            onClick={() => onCategoryChange("All")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedCategory === "All"
                ? "bg-teal-700 text-white shadow-sm ring-1 ring-teal-700"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            All
            <span className="ml-1.5 opacity-70">({totalCount})</span>
          </button>

          {RESOURCE_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] ?? 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-teal-700 text-white shadow-sm ring-1 ring-teal-700"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                {cat}
                {count > 0 && <span className="ml-1.5 opacity-70">({count})</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Summary Bar */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-900">{filteredCount}</span> of{" "}
          <span className="font-semibold text-slate-900">{totalCount}</span> institutional resources
          {isFiltered && (
            <span className="ml-1 text-teal-700 font-medium">
              (filtered)
            </span>
          )}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-medium text-teal-700 hover:underline"
          >
            Clear all active filters
          </button>
        )}
      </div>
    </div>
  );
}
