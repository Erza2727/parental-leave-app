import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          Parental Leave Application
        </h1>
        <p className="mt-3 text-slate-600">
          Start a new parental leave application.
        </p>

        <Link
          href="/application/applicant"
          className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Start application
        </Link>
      </div>
    </main>
  )
}