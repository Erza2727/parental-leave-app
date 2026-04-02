import { z } from 'zod'

export const leaveSchema = z
  .object({
    leave: z.object({
      startDate: z.date({
        error: 'Start date is required',
      }),
      endDate: z.date({
        error: 'End date is required',
      }),
      ratio: z.enum(['25', '50', '75', '100'], {
        error: 'Please select a leave ratio',
      }),
    }),
  })
  .superRefine((data, ctx) => {
    const { startDate, endDate } = data.leave

    if (endDate <= startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['leave', 'endDate'],
        message: 'End date must be after start date',
      })
    }

    const maxEndDate = new Date(startDate)
    maxEndDate.setMonth(maxEndDate.getMonth() + 12)

    if (endDate > maxEndDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['leave', 'endDate'],
        message: 'Leave duration cannot exceed 12 months',
      })
    }
  })