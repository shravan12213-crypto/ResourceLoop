import { MOCK_RESOURCES } from "@/data/mock-resources";
import {
  ResourceItem,
  ResourceCategory,
  ResourceStatus,
  ResourceFilterState,
  RESOURCE_CATEGORIES,
} from "@/types/resource";

/**
 * Isolated Resource Data Access Service
 *
 * This layer encapsulates data fetching for the ResourceLoop frontend.
 * Currently backed by verified institutional mock records.
 * When the FastAPI endpoints (/api/v1/resources) are ready, only this file
 * needs to be updated with `fetch(...)` calls without changing the UI components.
 */

export interface GetResourcesOptions {
  searchQuery?: string;
  category?: ResourceCategory | "All";
  status?: ResourceStatus | "All";
}

export async function getResources(
  options: GetResourcesOptions = {}
): Promise<ResourceItem[]> {
  // Simulate minimal async resolution for realistic UI handling
  await new Promise((resolve) => setTimeout(resolve, 60));

  let results = [...MOCK_RESOURCES];

  // Search filtering (name, description, department, location, tags)
  if (options.searchQuery && options.searchQuery.trim() !== "") {
    const q = options.searchQuery.toLowerCase().trim();
    results = results.filter((item) => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchDept = item.department?.toLowerCase().includes(q) ?? false;
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
      return matchName || matchDesc || matchDept || matchLoc || matchCat || matchTags;
    });
  }

  // Category filtering
  if (options.category && options.category !== "All") {
    results = results.filter((item) => item.category === options.category);
  }

  // Status filtering
  if (options.status && options.status !== "All") {
    results = results.filter((item) => item.status === options.status);
  }

  return results;
}

export async function getResourceById(id: string): Promise<ResourceItem | null> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  const item = MOCK_RESOURCES.find((r) => r.id === id);
  return item || null;
}

export function getAllCategories(): ResourceCategory[] {
  return RESOURCE_CATEGORIES;
}

export function getResourceStats() {
  const total = MOCK_RESOURCES.length;
  const available = MOCK_RESOURCES.filter((r) => r.status === "Available").length;
  const maintenance = MOCK_RESOURCES.filter((r) => r.status === "Maintenance").length;
  const unavailable = MOCK_RESOURCES.filter((r) => r.status === "Unavailable").length;
  const retired = MOCK_RESOURCES.filter((r) => r.status === "Retired").length;
  return { total, available, maintenance, unavailable, retired };
}
