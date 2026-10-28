/**
 * Resource Discovery TypeScript Definitions
 * Aligned with the ResourceLoop Teammate Task Brief.
 */

export type ResourceCategory =
  | "Electronics"
  | "Tools"
  | "Lab Equipment"
  | "Rooms"
  | "Sports"
  | "Other";

export type ResourceStatus =
  | "Available"
  | "Unavailable"
  | "Maintenance"
  | "Retired";

export interface ResourceItem {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  location: string;
  status: ResourceStatus;
  quantity: number;
  ownerName?: string;
  department?: string;
  eligibilityRules?: string;
  imageUrl?: string;
  specifications?: Record<string, string>;
  lastMaintained?: string;
  conditionSummary?: string;
  tags?: string[];
}

export interface ResourceFilterState {
  searchQuery: string;
  category: ResourceCategory | "All";
  status: ResourceStatus | "All";
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  "Electronics",
  "Tools",
  "Lab Equipment",
  "Rooms",
  "Sports",
  "Other",
];

export const RESOURCE_STATUSES: ResourceStatus[] = [
  "Available",
  "Unavailable",
  "Maintenance",
  "Retired",
];
