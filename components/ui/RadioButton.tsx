type RadioOption = {
  label: string
  value: string
}

type RadioButtonProps = {
  label: string
  name: string
  value?: string
  options: RadioOption[]
  onChange: (value: string) => void
  error?: string
}

export default function RadioButton({
  label,
  name,
  value,
  options,
  onChange,
  error,
}: RadioButtonProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-800">{label}</p>

      <div className="space-y-2">
        {options.map((option) => {
          const checked = value === option.value

          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                checked
                  ? 'border-slate-900 bg-slate-50'
                  : 'border-slate-300 bg-white hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="h-4 w-4"
              />
              <span className="text-sm text-slate-900">{option.label}</span>
            </label>
          )
        })}
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}