import type { FilterOption } from '@/types'

interface FilterRowProps<T extends string> {
  label: string
  question?: string
  options: FilterOption<T>[]
  value: T | 'all'
  onChange: (value: T | 'all') => void
}

export function FilterRow<T extends string>({
  label,
  question,
  options,
  value,
  onChange,
}: FilterRowProps<T>) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-subtle">
          {label}
        </span>
        {question && <span className="text-sm text-brand-muted">{question}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`pill ${active ? 'pill-active' : 'pill-inactive'}`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
