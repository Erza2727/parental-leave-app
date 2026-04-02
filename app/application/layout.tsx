'use client'

import { ReactNode, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import { defaultValues } from '@/lib/defaultValues'
import { ApplicationFormData } from '@/lib/types/application'
import { APPLICATION_STEPS } from '@/lib/constants/steps'

type ApplicationLayoutProps = {
  children: ReactNode
}

export default function ApplicationLayout({
  children,
}: ApplicationLayoutProps) {
  const methods = useForm<ApplicationFormData>({
    defaultValues,
    mode: 'onTouched',
  })

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const applicant = methods.getValues('applicant')
    const isFirstStep = pathname === '/application/applicant'

    const hasApplicantData =
      applicant.fullName ||
      applicant.kennitala ||
      applicant.address ||
      applicant.email ||
      applicant.phone

    if (!isFirstStep && !hasApplicantData) {
      router.replace('/application/applicant')
    }
  }, [pathname, router, methods])

  const currentStepIndex = APPLICATION_STEPS.findIndex(
    (step) => step.path === pathname
  )

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
          <header className="space-y-2">
            <p className="text-sm font-medium text-slate-600">
              Iceland Parental Leave Application
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Apply for parental leave
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Complete the application step by step. Your progress is shown
              below.
            </p>
          </header>

          <nav className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {APPLICATION_STEPS.map((step, index) => {
                const isActive = pathname === step.path
                const isCompleted = currentStepIndex > index

                return (
                  <li key={step.path}>
                    <button
                      type="button"
                      onClick={() => router.push(step.path)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                        isActive
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : isCompleted
                          ? 'border-slate-300 bg-slate-100 text-slate-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-xs font-medium uppercase tracking-wide">
                        Step {index + 1}
                      </span>
                      <span className="mt-1 block text-sm font-semibold">
                        {step.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          <main className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {children}
          </main>
        </div>
      </div>
    </FormProvider>
  )
}