import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export default function Input({
  label,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-800"
      >
        {label}
      </label>

      <input
        id={id}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition ${
          error
            ? 'border-red-500 bg-red-50'
            : 'border-slate-300 bg-white focus:border-slate-500'
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : null}
    </div>
  )
}