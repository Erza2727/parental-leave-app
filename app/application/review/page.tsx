"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, Path, useFormContext } from "react-hook-form";
import Button from "@/components/ui/Button";
import { ApplicationFormData } from "@/lib/types/application";

export default function ReviewPage() {
  const router = useRouter();
  const { getValues } = useFormContext<ApplicationFormData>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const data = getValues();

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate network delay

      const success = true;

      if (!success) {
        throw new Error("Failed to submit application. Please try again.");
      }

      const id = crypto.randomUUID(); // simulate returned application ID
      router.push(`/application/confirmation/${id}`);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm text-slate-600">Step 7 of 7</p>
        <h2 className="text-2xl font-semibold">Review & Submit</h2>
      </div>

      {/* 1 applicant */}
      <div className="space-y-2">
        <h3 className="font-medium">Applicant</h3>
        <p>{data.applicant.fullName}</p>
        <p>{data.applicant.kennitala}</p>
        <p>{data.applicant.address}</p>
        <p>{data.applicant.email}</p>
        <p>{data.applicant.phone}</p>

        <button
          onClick={() => router.push("/application/applicant")}
          className="text-sm text-blue-600 text-sm"
        >
          Edit Applicant Info
        </button>
      </div>

      {/* 2 employment */}
      <div className="space-y-2">
        <h3 className="font-medium">Employment</h3>
        <p>{data.employment.type}</p>

        {data.employment.type === "employed" && (
          <>
            <p>{data.employment.employerName}</p>
            <p>{data.employment.employmentRatio}%</p>
          </>
        )}

        {data.employment.type === "self-employed" && (
          <>
            <p>company: {data.employment.companyName}</p>
          </>
        )}

        <button
          onClick={() => router.push("/application/employment")}
          className="text-sm text-blue-600 text-sm"
        >
          Edit Employment Info
        </button>
      </div>

      {/* 3 partner */}
      <div className="space-y-2">
        <h3 className="font-medium">Partner</h3>
        <p>{data.partner.hasPartner}</p>

        {data.partner.hasPartner && (
          <>
            <p>{data.partner.fullName}</p>
            <p>{data.partner.kennitala}</p>
            <p>{data.partner.employmentStatus}</p>
          </>
        )}

        <button
          onClick={() => router.push("/application/partner")}
          className="text-sm text-blue-600 text-sm"
        >
          Edit partner Info
        </button>
      </div>

      {/* 4 leave */}
      <div className="space-y-2">
        <h3 className="font-medium">Leave Period</h3>
        <p>
          {data.leave.startDate
            ? new Date(data.leave.startDate).toLocaleDateString()
            : "Not set"}{" "}
          to{" "}
          {data.leave.endDate
            ? new Date(data.leave.endDate).toLocaleDateString()
            : "Not set"}{" "}
          ({data.leave.ratio}%)
        </p>

        <button
          onClick={() => router.push("/application/leave")}
          className="text-sm text-blue-600 text-sm"
        >
          Edit leave Info
        </button>
      </div>

      {/* 5 payment */}
      <div className="space-y-2">
        <h3 className="font-medium">Payment Info</h3>
        <p>{data.payment.bankNumber}</p>
        <p>{data.payment.ledger}</p>
        <p>{data.payment.accountNumber}</p>

        <button
          onClick={() => router.push("/application/payment")}
          className="text-sm text-blue-600 text-sm"
        >
          Edit payment Info
        </button>
      </div>

      {/* 6 Documents */}
      <div className="space-y-2">
        <h3 className="font-medium">Documents</h3>

        {data.documents.files?.map((file, i) => (
          <p key={i}>{file.name}</p>
        ))}

        <button
          onClick={() => router.push("/application/documents")}
          className="text-blue-600 text-sm"
        >
          Edit
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/application/documents")}
        >
          Back
        </Button>

        <Button type="button" onClick={handleSubmit}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </section>
  );
}
