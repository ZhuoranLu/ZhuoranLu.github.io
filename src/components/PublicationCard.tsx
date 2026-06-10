import type { Publication } from '@/types'
import { renderInline } from '@/lib/inline'
import { VENUE_COLORS } from '@/data/filters'

interface Props {
  pub: Publication
}

export function PublicationCard({ pub }: Props) {
  return (
    <article className="animate-fade-in border-b border-brand-border py-5 last:border-b-0">
      <div className="leading-relaxed">
        {pub.venue && (
          <span
            className="mr-2 inline-flex w-16 translate-y-[-1px] items-center justify-center rounded px-1 py-0.5 align-middle text-xs font-semibold text-black"
            style={{ backgroundColor: VENUE_COLORS[pub.venue] ?? '#C0C0C0' }}
          >
            {pub.venue}
          </span>
        )}
        {pub.url ? (
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-heading hover:text-brand-primary"
          >
            {pub.title}
          </a>
        ) : (
          <span className="font-semibold text-brand-heading">{pub.title}</span>
        )}
        {pub.award && (
          <span className="ml-1 font-semibold text-brand-danger">[{pub.award}]</span>
        )}
      </div>

      <div className="mt-1.5 text-sm text-brand-muted">{renderInline(pub.authors)}</div>
      <div className="mt-0.5 text-sm italic text-brand-subtle">{pub.venueFull}</div>
      {pub.prelim && <div className="text-sm italic text-brand-subtle">{pub.prelim}</div>}
    </article>
  )
}
