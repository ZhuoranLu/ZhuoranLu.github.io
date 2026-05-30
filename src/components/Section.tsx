import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title?: string
  children: ReactNode
}

/** A page section with an anchor id (scroll-margin handled in index.css). */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="border-t border-brand-border py-9 first:border-t-0 first:pt-7"
    >
      {title && (
        <h2 className="mb-5 flex items-center gap-3 text-2xl font-semibold tracking-tight text-brand-heading">
          <span className="inline-block h-6 w-1.5 rounded-full bg-brand-primary" />
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}
