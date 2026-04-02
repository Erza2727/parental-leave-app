'use client'

import { useRouter } from 'next/navigation'
import { Controller, Path, useFormContext } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import RadioButton from '@/components/ui/RadioButton'
import { employmentSchema } from '@/lib/schemas/employmentSchema'
import { ApplicationFormData } from '@/lib/types/application'

export default function EmploymentPage() {
  const router = useRouter()

  const {
    control,
    register,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const employmentType = watch('employment.type')

  const handleNext = () => {
    clearErrors([
      'employment.type',
      'employment.employerName',
      'employment.employmentRatio',
      'employment.companyName',
    ])

    const values = {
      employment: {
        type: getValues('employment.type'),
        employerName: getValues('employment.employerName').trim(),
        employmentRatio: getValues('employment.employmentRatio').trim(),
        companyName: getValues('employment.companyName').trim(),
      },
    }

    const result = employmentSchema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.join('.')

        if (
          path === 'employment.type' ||
          path === 'employment.employerName' ||
          path === 'employment.employmentRatio' ||
          path === 'employment.companyName'
        ) {
          setError(path as Path<ApplicationFormData>, {
            type: 'manual',
            message: issue.message,
          })
        }
      }

      return
    }

    router.push('/application/partner')
  }

  const handleBack = () => {
    router.push('/application/applicant')
  }

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">Step 2 of 7</p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Employment Details
        </h2>
        <p className="text-sm text-slate-600">
          Select the applicant&apos;s employment type and provide any required
          details.
        </p>
      </div>

      <Controller
        control={control}
        name="employment.type"
        render={({ field }) => (
          <RadioButton
            label="Employment type"
            name={field.name}
            value={field.value}
            onChange={(value) => {
              field.onChange(value)

              if (value === 'employed') {
                setValue('employment.companyName', '')
              }

              if (value === 'self-employed') {
                setValue('employment.employerName', '')
                setValue('employment.employmentRatio', '')
              }

              if (value === 'unemployed') {
                setValue('employment.employerName', '')
                setValue('employment.employmentRatio', '')
                setValue('employment.companyName', '')
              }

              clearErrors([
                'employment.type',
                'employment.employerName',
                'employment.employmentRatio',
                'employment.companyName',
              ])
            }}
            options={[
              { label: 'Employed', value: 'employed' },
              { label: 'Self-employed', value: 'self-employed' },
              { label: 'Unemployed', value: 'unemployed' },
            ]}
            error={errors.employment?.type?.message}
          />
        )}
      />

      {employmentType === 'employed' ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            id="employerName"
            label="Employer name"
            placeholder="Enter employer name"
            error={errors.employment?.employerName?.message}
            {...register('employment.employerName')}
          />

          <Input
            id="employmentRatio"
            label="Employment ratio (%)"
            placeholder="1-100"
            inputMode="numeric"
            error={errors.employment?.employmentRatio?.message}
            {...register('employment.employmentRatio', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3)
              },
            })}
          />
        </div>
      ) : null}

      {employmentType === 'self-employed' ? (
        <div className="grid gap-6">
          <Input
            id="companyName"
            label="Company name"
            placeholder="Enter company name"
            error={errors.employment?.companyName?.message}
            {...register('employment.companyName')}
          />
        </div>
      ) : null}

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={handleBack}>
          Back
        </Button>

        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </section>
  )
}