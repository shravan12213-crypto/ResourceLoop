export type ResourceCategory =
  | "LAB_EQUIPMENT"
  | "FACILITY_SPACE"
  | "COMPUTE_RIG"
  | "FIELD_DEVICE";

export type ResourceStatus = "AVAILABLE" | "MAINTENANCE" | "RETIRED";

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  department: string;
  location: string;
  status: ResourceStatus;
  description?: string;
  specifications: Record<string, unknown>;
  custodianName?: string;
}

export type TrustFlowStage =
  | "DISCOVERY"
  | "ELIGIBILITY"
  | "REQUESTED"
  | "APPROVED"
  | "FAIR_ALLOCATION"
  | "CHECKED_IN"
  | "INITIAL_CONDITION"
  | "RETURNED"
  | "FINAL_CONDITION"
  | "INCIDENT_AUDIT";

export type BookingStatus =
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "CHECKED_IN"
  | "RETURNED"
  | "CANCELLED"
  | "COMPLETED"
  | "DISPUTED";

export interface Booking {
  id: string;
  resourceId: string;
  requesterId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  purpose: string;
}

export interface SystemHealth {
  status: "healthy" | "degraded" | "unhealthy";
  version: string;
  timestamp: string;
  database?: {
    connected: boolean;
    details: string;
  };
}

export * from "./resource";
