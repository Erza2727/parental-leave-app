"use client";
import { useRouter } from "next/navigation";
import { Path, useFormContext } from "react-hook-form";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import { documentsSchema } from "@/lib/schemas/documentsSchema";
import { ApplicationFormData } from "@/lib/types/application";
import { Controller } from "react-hook-form";

export default function DocumentsPage() {
  const router = useRouter();

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ApplicationFormData>();

  const handleNext = () => {
    clearErrors(["documents.files"]);

    const values = {
      documents: {
        files: getValues("documents.files"),
      },
    };

    const result = documentsSchema.safeParse(values);

    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path.join(".") === "documents.files") {
          setError("documents.files" as Path<ApplicationFormData>, {
            type: "manual",
            message: issue.message,
          });
        }
      }

      return;
    }

    router.push("/application/review");
  };

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">Step 6 of 7</p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Supporting Documents
        </h2>
        <p className="text-sm text-slate-600">
          Upload required documents for your application.
        </p>
      </div>

      <Controller
        name="documents.files"
        render={({ field }) => (
          <FileUpload
            label="Upload documents"
            error={errors.documents?.files?.message}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              field.onChange(files);
            }}
          />
        )}
      />

      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/application/payment")}
        >
          Back
        </Button>

        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </section>
  );
}
