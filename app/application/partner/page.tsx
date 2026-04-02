'use client'

import { useRouter } from 'next/navigation'
import { Controller, Path, useFormContext } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { partnerSchema } from '@/lib/schemas/partnerSchema'
import { ApplicationFormData } from '@/lib/types/application'

export default function PartnerPage() {
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

  const hasPartner = watch('partner.hasPartner')

  const handleNext = () => {
    clearErrors([
      'partner.fullName',
      'partner.kennitala',
      'partner.employmentStatus',
    ])

    const values = {
      partner: {
        hasPartner: getValues('partner.hasPartner'),
        fullName: getValues('partner.fullName').trim(),
        kennitala: getValues('partner.kennitala').trim(),
        employmentStatus: getValues('partner.employmentStatus').trim(),
      },
    }

    const result = partnerSchema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.join('.')

        if (
          path === 'partner.fullName' ||
          path === 'partner.kennitala' ||
          path === 'partner.employmentStatus'
        ) {
          setError(path as Path<ApplicationFormData>, {
            type: 'manual',
            message: issue.message,
          })
        }
      }

      return
    }

    router.push('/application/leave')
  }

  const handleBack = () => {
    router.push('/application/employment')
  }

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">Step 3 of 7</p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Partner Information
        </h2>
        <p className="text-sm text-slate-600">
          Add partner details only if the applicant has a partner.
        </p>
      </div>

      <Controller
        control={control}
        name="partner.hasPartner"
        render={({ field }) => (
          <Checkbox
            id="hasPartner"
            label="I have a partner"
            checked={field.value}
            onChange={(checked) => {
              field.onChange(checked)

              if (!checked) {
                setValue('partner.fullName', '')
                setValue('partner.kennitala', '')
                setValue('partner.employmentStatus', '')
                clearErrors([
                  'partner.fullName',
                  'partner.kennitala',
                  'partner.employmentStatus',
                ])
              }
            }}
          />
        )}
      />

      {hasPartner ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            id="partnerFullName"
            label="Partner full name"
            placeholder="Enter partner full name"
            error={errors.partner?.fullName?.message}
            {...register('partner.fullName')}
          />

          <Input
            id="partnerKennitala"
            label="Partner kennitala"
            placeholder="10 digits"
            inputMode="numeric"
            maxLength={10}
            error={errors.partner?.kennitala?.message}
            {...register('partner.kennitala', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
              },
            })}
          />

          <div className="sm:col-span-2">
            <Controller
              control={control}
              name="partner.employmentStatus"
              render={({ field }) => (
                <Select
                  id="partnerEmploymentStatus"
                  label="Partner employment status"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.partner?.employmentStatus?.message}
                  options={[
                    { label: 'Select employment status', value: '' },
                    { label: 'Employed', value: 'employed' },
                    { label: 'Self-employed', value: 'self-employed' },
                    { label: 'Unemployed', value: 'unemployed' },
                  ]}
                />
              )}
            />
          </div>
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