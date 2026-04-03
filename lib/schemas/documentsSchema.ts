import { z } from "zod";
export const documentsSchema = z.object({
  documents: z.object({
    files: z
      .array(z.instanceof(File))
      .min(1, "Please upload at least one document")
      .refine((files) => {
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
        return files.every((file) => allowedTypes.includes(file.type));
      }, "Only PDF, JPEG, and PNG files are allowed")
      .refine(
        (files) => files.every((file) => file.size <= 25 * 1024 * 1024),
        "Maximum file size is 25MB",
      ),
  }),
});
