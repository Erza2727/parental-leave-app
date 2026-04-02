import { z } from 'zod'

export const partnerSchema = z
  .object({
    partner: z.object({
      hasPartner: z.boolean(),
      fullName: z.string(),
      kennitala: z.string(),
      employmentStatus: z.string(),
    }),
  })
  .superRefine((data, ctx) => {
    const { hasPartner, fullName, kennitala, employmentStatus } = data.partner

    if (!hasPartner) {
      return
    }

    if (!fullName.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['partner', 'fullName'],
        message: 'Partner full name is required',
      })
    }

    if (!/^\d{10}$/.test(kennitala.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['partner', 'kennitala'],
        message: 'Partner kennitala must be exactly 10 digits',
      })
    }

    if (
      employmentStatus !== 'employed' &&
      employmentStatus !== 'self-employed' &&
      employmentStatus !== 'unemployed'
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['partner', 'employmentStatus'],
        message: 'Please select a partner employment status',
      })
    }
  })