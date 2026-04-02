'use client'

import { useRouter } from 'next/navigation'
import { Path, useFormContext } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { paymentSchema } from '@/lib/schemas/paymentSchema'
import { ApplicationFormData } from '@/lib/types/application'

export default function PaymentPage() {
  const router = useRouter()

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const handleNext = () => {
    clearErrors([
      'payment.bankNumber',
      'payment.ledger',
      'payment.accountNumber',
    ])

    const values = {
      payment: {
        bankNumber: getValues('payment.bankNumber').trim(),
        ledger: getValues('payment.ledger').trim(),
        accountNumber: getValues('payment.accountNumber').trim(),
      },
    }

    const result = paymentSchema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.join('.')

        if (
          path === 'payment.bankNumber' ||
          path === 'payment.ledger' ||
          path === 'payment.accountNumber'
        ) {
          setError(path as Path<ApplicationFormData>, {
            type: 'manual',
            message: issue.message,
          })
        }
      }

      return
    }

    router.push('/application/documents')
  }

  const handleBack = () => {
    router.push('/application/leave')
  }

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">Step 5 of 7</p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Payment Details
        </h2>
        <p className="text-sm text-slate-600">
          Enter the bank account details in the format 0000-00-000000.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_2fr] sm:items-start">
          <Input
            id="bankNumber"
            label="Bank number"
            placeholder="0000"
            inputMode="numeric"
            maxLength={4}
            error={errors.payment?.bankNumber?.message}
            {...register('payment.bankNumber', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4)
              },
            })}
          />

          <div className="hidden pt-9 text-xl font-semibold text-slate-500 sm:block">
            -
          </div>

          <Input
            id="ledger"
            label="Ledger"
            placeholder="00"
            inputMode="numeric"
            maxLength={2}
            error={errors.payment?.ledger?.message}
            {...register('payment.ledger', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2)
              },
            })}
          />

          <div className="hidden pt-9 text-xl font-semibold text-slate-500 sm:block">
            -
          </div>

          <Input
            id="accountNumber"
            label="Account number"
            placeholder="000000"
            inputMode="numeric"
            maxLength={6}
            error={errors.payment?.accountNumber?.message}
            {...register('payment.accountNumber', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6)
              },
            })}
          />
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Example: 1234-56-123456
        </p>
      </div>

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