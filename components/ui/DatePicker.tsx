'use client'

import ReactDatePicker from 'react-datepicker'

type DatePickerProps = {
  label: string
  selected: Date | null
  onChange: (date: Date | null) => void
  minDate?: Date
  error?: string
  placeholderText?: string
  id: string
}

export default function DatePicker({
  label,
  selected,
  onChange,
  minDate,
  error,
  placeholderText,
  id,
}: DatePickerProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-800"
      >
        {label}
      </label>

      <ReactDatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholderText}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition ${
          error
            ? 'border-red-500 bg-red-50'
            : 'border-slate-300 bg-white focus:border-slate-500'
        }`}
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}