import { z } from 'zod'

export const paymentSchema = z.object({
  payment: z.object({
    bankNumber: z
      .string()
      .regex(/^\d{4}$/, 'Bank number must be exactly 4 digits'),
    ledger: z
      .string()
      .regex(/^\d{2}$/, 'Ledger must be exactly 2 digits'),
    accountNumber: z
      .string()
      .regex(/^\d{6}$/, 'Account number must be exactly 6 digits'),
  }),
})