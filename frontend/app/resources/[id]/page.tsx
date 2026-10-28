"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Building2,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  Layers,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Share2,
} from "lucide-react";
import { MOCK_RESOURCES } from "@/data/mock-resources";
import { ResourceStatusBadge } from "@/components/resources/resource-status-badge";
import { BorrowRequestModal } from "@/components/resources/borrow-request-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ResourceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const resourceId = params?.id as string;
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const resource = MOCK_RESOURCES.find((r) => r.id === resourceId);

  if (!resource) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
          <h1 className="text-xl font-bold text-slate-900">Resource Not Found</h1>
          <p className="mt-2 text-sm text-slate-500">
            The requested institutional resource ID <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono">{resourceId}</code> does not exist in the catalogue.
          </p>
          <div className="mt-6">
            <Link href="/resources">
              <Button variant="primary" size="md">
                &larr; Return to Resource Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isAvailable = resource.status === "Available";

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-slate-900 transition-colors">
                Resources
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-800 truncate max-w-xs sm:max-w-md">
                {resource.name}
              </span>
            </nav>

            <Link href="/resources">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-slate-600 hover:text-slate-900">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Detail Container */}
      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {resource.category}
                </span>
                <ResourceStatusBadge status={resource.status} />
                <span className="text-xs font-mono text-slate-400">
                  ID: {resource.id}
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {resource.name}
              </h1>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Specifications, Eligibility, Condition */}
          <div className="space-y-6 lg:col-span-2">
            {/* Technical Specifications */}
            {resource.specifications && Object.keys(resource.specifications).length > 0 && (
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="border-b border-slate-100 p-5">
                  <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-teal-700" />
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <dl className="divide-y divide-slate-100 text-sm">
                    {Object.entries(resource.specifications).map(([key, val]) => (
                      <div
                        key={key}
                        className="grid grid-cols-1 sm:grid-cols-3 px-5 py-3 hover:bg-slate-50/50 transition-colors"
                      >
                        <dt className="text-xs font-medium text-slate-500 sm:col-span-1">
                          {key}
                        </dt>
                        <dd className="mt-1 text-xs font-semibold text-slate-800 sm:col-span-2 sm:mt-0">
                          {String(val)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            )}

            {/* Operator Eligibility & TrustFlow Notice */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 p-5">
                <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-teal-700" />
                  Operator Eligibility & Induction
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="rounded-lg border border-teal-100 bg-teal-50/60 p-4 text-xs text-teal-950">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 shrink-0 text-teal-700 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Prerequisite Verification</p>
                      <p className="mt-1 text-xs leading-relaxed text-teal-900">
                        {resource.eligibilityRules || "Standard departmental authorization required."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <p className="font-medium text-slate-800">TrustFlow Access Requirements:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Institutional credentials verified with Single Sign-On.</li>
                    <li>Pre-use inspection and baseline condition attestation logged upon physical handover.</li>
                    <li>Post-use signoff required prior to deposit return.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Condition & Maintenance History */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 p-5">
                <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-teal-700" />
                  Condition & Maintenance Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <span className="text-slate-500">Current Health Attestation:</span>
                  <span className="font-semibold text-slate-900">
                    {resource.conditionSummary || "Verified in working condition"}
                  </span>
                </div>
                {resource.lastMaintained && (
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                    <span className="text-slate-500">Last Verified / Calibrated:</span>
                    <span className="font-mono font-medium text-slate-700">
                      {resource.lastMaintained}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Keyword Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-medium text-slate-400">Tags:</span>
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Custodian Info & Primary Borrow Action */}
          <div className="space-y-6">
            {/* Primary Action Card */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Access Status
                  </span>
                  <ResourceStatusBadge status={resource.status} />
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2 border-b border-slate-100 pb-4 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Layers className="h-4 w-4 text-slate-400" />
                      Total Units:
                    </span>
                    <span className="font-semibold text-slate-900">
                      {resource.quantity} unit{resource.quantity !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="h-4 w-4 text-slate-400" />
                      Availability:
                    </span>
                    <span className="font-semibold text-slate-900">
                      {isAvailable ? "Ready for Booking" : "Unavailable for Signout"}
                    </span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={() => setIsBorrowModalOpen(true)}
                    disabled={!isAvailable}
                    className={`w-full justify-center text-sm font-semibold shadow-sm ${
                      !isAvailable ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {isAvailable ? "Request to Borrow" : "Currently Unavailable"}
                  </Button>
                  <p className="mt-2 text-center text-[11px] text-slate-400">
                    {isAvailable
                      ? "Subject to TrustFlow custodian approval & operator sign-off"
                      : "Check back once scheduled maintenance or current reservation completes"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location & Custodian Contact Card */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 p-5">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Location & Custody
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-700">Physical Location:</span>
                    <p className="text-slate-800">{resource.location}</p>
                  </div>
                </div>

                {resource.department && (
                  <div className="flex items-start gap-2.5">
                    <Building2 className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-700">Managing Department:</span>
                      <p className="text-slate-800">{resource.department}</p>
                    </div>
                  </div>
                )}

                {resource.ownerName && (
                  <div className="flex items-start gap-2.5">
                    <UserCheck className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-700">Designated Custodian:</span>
                      <p className="text-slate-800">{resource.ownerName}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* TrustFlow Guarantee Badge */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
              <ShieldCheck className="mx-auto h-6 w-6 text-teal-700 mb-2" />
              <p className="text-xs font-semibold text-slate-800">
                Protected by TrustFlow
              </p>
              <p className="mt-1 text-[11px] text-slate-500 leading-normal">
                Verifiable operator eligibility, fair institutional allocation, and baseline-to-return condition logging.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Borrow Request Modal */}
      <BorrowRequestModal
        resource={resource}
        isOpen={isBorrowModalOpen}
        onClose={() => setIsBorrowModalOpen(false)}
      />
    </div>
  );
}
