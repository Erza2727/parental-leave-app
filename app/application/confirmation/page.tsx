"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <section className="flex flex-col items-center justify-center space-y-6 text-center py-16">
      <h2 className="text-3xl font-semibold text-slate-900">
        Application Submitted
      </h2>

      <p className="text-slate-600 max-w-md">
        Your parental leave application has been successfully submitted.
      </p>

      <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <p className="text-sm text-slate-500">Confirmation Number</p>
        <p className="font-mono text-slate-900">{id}</p>
      </div>
    </section>
  );
}
