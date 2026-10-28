"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Building,
  CheckCircle2,
  Clock,
  Wrench,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { ResourceItem, ResourceCategory, ResourceStatus } from "@/types/resource";
import { MOCK_RESOURCES } from "@/data/mock-resources";
import { getResourceStats } from "@/lib/resources";
import { ResourceCard } from "@/components/resources/resource-card";
import { ResourceSearchFilter } from "@/components/resources/resource-search-filter";
import { ResourceEmptyState } from "@/components/resources/resource-empty-state";
import { BorrowRequestModal } from "@/components/resources/borrow-request-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<ResourceStatus | "All">("All");
  const [activeResourceForBorrow, setActiveResourceForBorrow] = useState<ResourceItem | null>(null);

  // Quick stats
  const stats = useMemo(() => getResourceStats(), []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_RESOURCES.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return MOCK_RESOURCES.filter((resource) => {
      // Search query filtering
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchName = resource.name.toLowerCase().includes(q);
        const matchDesc = resource.description.toLowerCase().includes(q);
        const matchDept = resource.department?.toLowerCase().includes(q) ?? false;
        const matchLoc = resource.location.toLowerCase().includes(q);
        const matchCat = resource.category.toLowerCase().includes(q);
        const matchTags = resource.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        if (!matchName && !matchDesc && !matchDept && !matchLoc && !matchCat && !matchTags) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "All" && resource.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "All" && resource.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Breadcrumb & Page Banner */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                <Link href="/" className="hover:text-slate-900 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="font-medium text-slate-800">Resource Catalogue</span>
              </nav>

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Institutional Resource Catalogue
                </h1>
                <Badge variant="default" className="text-xs">
                  TrustFlow Verified
                </Badge>
              </div>

              <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                Browse shared scientific instrumentation, rapid fabrication tools, testing cleanrooms, and technical equipment available across university departments.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-600">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>
                  <strong className="text-slate-900 font-semibold">{stats.available}</strong> Available
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-600">
                <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                <span>
                  <strong className="text-slate-900 font-semibold">{stats.maintenance}</strong> In Maintenance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Search & Filter Component */}
        <div className="mb-6">
          <ResourceSearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onResetFilters={handleResetFilters}
            totalCount={MOCK_RESOURCES.length}
            filteredCount={filteredResources.length}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Resources Grid or Empty State */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onRequestBorrow={(item) => setActiveResourceForBorrow(item)}
              />
            ))}
          </div>
        ) : (
          <ResourceEmptyState
            searchQuery={searchQuery}
            category={selectedCategory}
            status={selectedStatus}
            onReset={handleResetFilters}
          />
        )}

        {/* Bottom Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" />
              Return to Platform Overview
            </Button>
          </Link>
          <p className="text-xs text-slate-400">
            ResourceLoop &bull; Hackathon MVP Discovery Catalogue
          </p>
        </div>
      </main>

      {/* Borrow Request Modal */}
      <BorrowRequestModal
        resource={activeResourceForBorrow}
        isOpen={Boolean(activeResourceForBorrow)}
        onClose={() => setActiveResourceForBorrow(null)}
      />
    </div>
  );
}
