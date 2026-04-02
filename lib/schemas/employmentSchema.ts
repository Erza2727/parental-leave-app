import { z } from 'zod'

export const employmentSchema = z
  .object({
    employment: z.object({
      type: z.string().min(1, 'Please select an employment type'),
      employerName: z.string(),
      employmentRatio: z.string(),
      companyName: z.string(),
    }),
  })
  .superRefine((data, ctx) => {
    const { type, employerName, employmentRatio, companyName } = data.employment

    if (type === 'employed') {
      if (!employerName.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['employment', 'employerName'],
          message: 'Employer name is required',
        })
      }

      if (!employmentRatio.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['employment', 'employmentRatio'],
          message: 'Employment ratio is required',
        })
      } else {
        const ratio = Number(employmentRatio)

        if (!Number.isInteger(ratio) || ratio < 1 || ratio > 100) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['employment', 'employmentRatio'],
            message: 'Employment ratio must be a percentage between 1 and 100',
          })
        }
      }
    }

    if (type === 'self-employed' && !companyName.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['employment', 'companyName'],
        message: 'Company name is required',
      })
    }

    if (
      type !== 'employed' &&
      type !== 'self-employed' &&
      type !== 'unemployed'
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['employment', 'type'],
        message: 'Please select an employment type',
      })
    }
  })