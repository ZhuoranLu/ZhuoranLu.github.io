import type { FilterOption } from '@/types'

interface FilterRowProps<T extends string> {
  label?: string
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
    <div className="flex flex-wrap items-center gap-2">
      {label && (
        <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-brand-text/60">
          {label}
        </span>
      )}
      {question && (
        <span className="mr-1 w-full text-sm font-medium text-brand-text/80 sm:w-auto">
          {question}
        </span>
      )}
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={
              'rounded-full px-3 py-1 text-sm transition-colors ' +
              (active
                ? 'bg-brand-heading text-white'
                : 'bg-[#F4F6F8] text-brand-text hover:bg-[#E5E7EB]')
            }
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
