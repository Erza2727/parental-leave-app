import { z } from 'zod'

export const applicantSchema = z.object({
  applicant: z.object({
    fullName: z
      .string()
      .min(1, 'Full name is required'),
    kennitala: z
      .string()
      .regex(/^\d{10}$/, 'Kennitala must be exactly 10 digits'),
    address: z
      .string()
      .min(1, 'Address is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    phone: z
      .string()
      .regex(/^\d{7}$/, 'Phone number must be exactly 7 digits'),
  }),
})

export type ApplicantSchemaType = z.infer<typeof applicantSchema>