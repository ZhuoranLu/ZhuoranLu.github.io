import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title?: string
  children: ReactNode
}

/** A page section with an anchor id (scroll-margin handled in index.css). */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-8">
      {title && (
        <h2 className="mb-4 text-2xl font-bold text-brand-heading">{title}</h2>
      )}
      {children}
    </section>
  )
}
