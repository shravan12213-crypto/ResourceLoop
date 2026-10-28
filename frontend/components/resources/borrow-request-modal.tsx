import React, { useEffect } from "react";
import {
  X,
  ShieldAlert,
  Info,
  Calendar,
  UserCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { ResourceItem } from "@/types/resource";
import { ResourceStatusBadge } from "./resource-status-badge";
import { Button } from "@/components/ui/button";

interface BorrowRequestModalProps {
  resource: ResourceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BorrowRequestModal({
  resource,
  isOpen,
  onClose,
}: BorrowRequestModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                TrustFlow Protocol
              </span>
              <ResourceStatusBadge status={resource.status} showDot={false} />
            </div>
            <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
              Borrow Request &bull; {resource.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 py-4 text-sm">
          {/* Transparent API notice */}
          <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3.5 text-amber-900">
            <div className="flex items-start gap-2.5">
              <Info className="h-5 w-5 shrink-0 text-amber-700 mt-0.5" />
              <div>
                <p className="font-semibold text-xs">
                  Booking Engine Integration in Progress
                </p>
                <p className="mt-1 text-xs text-amber-800 leading-relaxed">
                  The TrustFlow booking state machine is currently being integrated with the FastAPI backend. Automated reservation submission will go live upon completion of the API endpoints.
                </p>
              </div>
            </div>
          </div>

          {/* Resource Details Summary */}
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Resource Category:</span>
              <span className="font-medium text-slate-800">{resource.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Location:</span>
              <span className="font-medium text-slate-800">{resource.location}</span>
            </div>
            {resource.department && (
              <div className="flex justify-between">
                <span className="text-slate-500">Custodial Department:</span>
                <span className="font-medium text-slate-800">{resource.department}</span>
              </div>
            )}
            {resource.ownerName && (
              <div className="flex justify-between">
                <span className="text-slate-500">Resource Custodian:</span>
                <span className="font-medium text-slate-800">{resource.ownerName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">Available Quantity:</span>
              <span className="font-medium text-slate-800">{resource.quantity} unit(s)</span>
            </div>
          </div>

          {/* Eligibility Requirements */}
          {resource.eligibilityRules && (
            <div className="rounded-lg border border-teal-100 bg-teal-50/50 p-3 text-xs text-teal-900">
              <div className="flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 text-teal-700 mt-0.5" />
                <div>
                  <span className="font-semibold">Operator Eligibility Requirement:</span>
                  <p className="mt-0.5 text-teal-800">{resource.eligibilityRules}</p>
                </div>
              </div>
            </div>
          )}

          {/* TrustFlow Lifecycle Overview */}
          <div className="space-y-1.5 pt-1">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Upcoming TrustFlow Workflow:
            </p>
            <ol className="space-y-1 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-100 text-[10px] font-bold text-teal-800">1</span>
                <span>Operator credential & safety induction verification</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">2</span>
                <span>Custodian approval & calendar slot reservation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">3</span>
                <span>Pre-handover & post-return dual condition attestation</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Close
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled
            className="text-xs cursor-not-allowed opacity-60"
            title="Disabled until backend booking API integration"
          >
            Submit Request (Awaiting API)
          </Button>
        </div>
      </div>
    </div>
  );
}
