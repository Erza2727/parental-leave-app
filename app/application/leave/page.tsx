'use client'

import { useRouter } from 'next/navigation'
import { Controller, Path, useFormContext } from 'react-hook-form'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import RadioButton from '@/components/ui/RadioButton'
import { leaveSchema } from '@/lib/schemas/leaveSchema'
import { ApplicationFormData } from '@/lib/types/application'

export default function LeavePage() {
  const router = useRouter()

  const {
    control,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const startDate = watch('leave.startDate')

  const handleNext = () => {
    clearErrors(['leave.startDate', 'leave.endDate', 'leave.ratio'])

    const values = {
      leave: {
        startDate: getValues('leave.startDate'),
        endDate: getValues('leave.endDate'),
        ratio: getValues('leave.ratio'),
      },
    }

    const result = leaveSchema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.join('.')

        if (
          path === 'leave.startDate' ||
          path === 'leave.endDate' ||
          path === 'leave.ratio'
        ) {
          setError(path as Path<ApplicationFormData>, {
            type: 'manual',
            message: issue.message,
          })
        }
      }

      return
    }

    router.push('/application/payment')
  }

  const handleBack = () => {
    router.push('/application/partner')
  }

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">Step 4 of 7</p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Leave Period
        </h2>
        <p className="text-sm text-slate-600">
          Select the leave dates and leave ratio.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Controller
          control={control}
          name="leave.startDate"
          render={({ field }) => (
            <DatePicker
              id="startDate"
              label="Start date"
              selected={field.value}
              onChange={(date) => {
                field.onChange(date)
                clearErrors(['leave.startDate', 'leave.endDate'])
              }}
              error={errors.leave?.startDate?.message}
              placeholderText="Select start date"
            />
          )}
        />

        <Controller
          control={control}
          name="leave.endDate"
          render={({ field }) => (
            <DatePicker
              id="endDate"
              label="End date"
              selected={field.value}
              onChange={(date) => {
                field.onChange(date)
                clearErrors(['leave.endDate'])
              }}
              minDate={startDate ?? undefined}
              error={errors.leave?.endDate?.message}
              placeholderText="Select end date"
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="leave.ratio"
        render={({ field }) => (
          <RadioButton
            label="Leave ratio"
            name={field.name}
            value={field.value}
            onChange={(value) => {
              field.onChange(value)
              clearErrors(['leave.ratio'])
            }}
            options={[
              { label: '25%', value: '25' },
              { label: '50%', value: '50' },
              { label: '75%', value: '75' },
              { label: '100%', value: '100' },
            ]}
            error={errors.leave?.ratio?.message}
          />
        )}
      />

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