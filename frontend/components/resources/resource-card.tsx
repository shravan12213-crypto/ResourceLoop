import React from "react";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Wrench,
  FlaskConical,
  DoorOpen,
  Activity,
  Package,
} from "lucide-react";
import { ResourceItem, ResourceCategory } from "@/types/resource";
import { ResourceStatusBadge } from "./resource-status-badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  resource: ResourceItem;
  onRequestBorrow?: (resource: ResourceItem) => void;
}

export function ResourceCard({ resource, onRequestBorrow }: ResourceCardProps) {
  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case "Electronics":
        return <Cpu className="h-3.5 w-3.5 text-blue-600" />;
      case "Tools":
        return <Wrench className="h-3.5 w-3.5 text-amber-600" />;
      case "Lab Equipment":
        return <FlaskConical className="h-3.5 w-3.5 text-teal-600" />;
      case "Rooms":
        return <DoorOpen className="h-3.5 w-3.5 text-purple-600" />;
      case "Sports":
        return <Activity className="h-3.5 w-3.5 text-emerald-600" />;
      case "Other":
      default:
        return <Package className="h-3.5 w-3.5 text-slate-600" />;
    }
  };

  const isRequestable = resource.status === "Available";

  return (
    <Card className="group flex flex-col justify-between border-slate-200/90 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/50 hover:shadow-md focus-within:ring-2 focus-within:ring-teal-600/30">
      <div>
        <CardHeader className="p-5 pb-3">
          {/* Top badges: Category and Status */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              {getCategoryIcon(resource.category)}
              <span>{resource.category}</span>
            </span>
            <ResourceStatusBadge status={resource.status} />
          </div>

          {/* Title */}
          <CardTitle className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-teal-700 transition-colors">
            <Link
              href={`/resources/${resource.id}`}
              className="focus:outline-none focus:underline"
            >
              {resource.name}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          {/* Short description */}
          <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
            {resource.description}
          </p>

          {/* Core Metadata Grid */}
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{resource.location}</span>
            </div>

            {/* Department */}
            {resource.department && (
              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{resource.department}</span>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-slate-400" />
                <span>Quantity:</span>
              </span>
              <span className="font-semibold text-slate-700">
                {resource.quantity > 0 ? `${resource.quantity} unit${resource.quantity > 1 ? "s" : ""}` : "None available"}
              </span>
            </div>

            {/* TrustFlow Eligibility Snippet */}
            {resource.eligibilityRules && (
              <div className="mt-2 flex items-start gap-1.5 rounded bg-slate-50 p-2 text-[11px] text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-teal-600 mt-0.5" />
                <span className="line-clamp-1 italic">{resource.eligibilityRules}</span>
              </div>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/50 p-4">
        <Link
          href={`/resources/${resource.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
        >
          View details
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>

        {onRequestBorrow ? (
          <button
            type="button"
            onClick={() => onRequestBorrow(resource)}
            disabled={!isRequestable}
            className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              isRequestable
                ? "bg-teal-700 text-white hover:bg-teal-800 shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isRequestable ? "Request" : "Unavailable"}
          </button>
        ) : (
          <Link
            href={`/resources/${resource.id}`}
            className="rounded bg-teal-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-800 transition-colors shadow-sm"
          >
            Explore
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
