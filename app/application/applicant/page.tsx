'use client'

import { useRouter } from 'next/navigation'
import { Path, useFormContext } from 'react-hook-form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { applicantSchema } from '@/lib/schemas/applicantSchema'
import { ApplicationFormData } from '@/lib/types/application'

export default function ApplicantPage() {
  const router = useRouter()

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const handleNext = async () => {
    clearErrors([
      'applicant.fullName',
      'applicant.kennitala',
      'applicant.address',
      'applicant.email',
      'applicant.phone',
    ])

    const values = {
      applicant: {
        fullName: getValues('applicant.fullName').trim(),
        kennitala: getValues('applicant.kennitala').trim(),
        address: getValues('applicant.address').trim(),
        email: getValues('applicant.email').trim(),
        phone: getValues('applicant.phone').trim(),
      },
    }

    const result = applicantSchema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.join('.')

        if (
          path === 'applicant.fullName' ||
          path === 'applicant.kennitala' ||
          path === 'applicant.address' ||
          path === 'applicant.email' ||
          path === 'applicant.phone'
        ) {
          setError(path as Path<ApplicationFormData>, {
            type: 'manual',
            message: issue.message,
          })
        }
      }

      return
    }

    router.push('/application/employment')
  }

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">Step 1 of 7</p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Applicant Information
        </h2>
        <p className="text-sm text-slate-600">
          Enter the applicant&apos;s personal details to begin the application.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="fullName"
          label="Full name"
          placeholder="Enter full name"
          error={errors.applicant?.fullName?.message}
          {...register('applicant.fullName')}
        />

        <Input
          id="kennitala"
          label="Kennitala"
          placeholder="10 digits"
          inputMode="numeric"
          maxLength={10}
          error={errors.applicant?.kennitala?.message}
          {...register('applicant.kennitala', {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
            },
          })}
        />

        <div className="sm:col-span-2">
          <Input
            id="address"
            label="Address"
            placeholder="Enter address"
            error={errors.applicant?.address?.message}
            {...register('applicant.address')}
          />
        </div>

        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="name@example.com"
          error={errors.applicant?.email?.message}
          {...register('applicant.email')}
        />

        <Input
          id="phone"
          label="Phone number"
          placeholder="7 digits"
          inputMode="numeric"
          maxLength={7}
          error={errors.applicant?.phone?.message}
          {...register('applicant.phone', {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, '').slice(0, 7)
            },
          })}
        />
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </section>
  )
}