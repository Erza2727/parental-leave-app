import { SelectHTMLAttributes } from 'react'

type SelectOption = {
  label: string
  value: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: SelectOption[]
  error?: string
}

export default function Select({
  id,
  label,
  options,
  error,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-800"
      >
        {label}
      </label>

      <select
        id={id}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition ${
          error
            ? 'border-red-500 bg-red-50'
            : 'border-slate-300 bg-white focus:border-slate-500'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}