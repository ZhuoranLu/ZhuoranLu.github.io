import type { Publication } from '@/types'
import { renderInline } from '@/lib/inline'
import { VENUE_COLORS } from '@/data/filters'

interface Props {
  pub: Publication
}

export function PublicationCard({ pub }: Props) {
  return (
    <article className="animate-fade-in border-b border-brand-border py-4">
      <div className="leading-relaxed">
        {pub.venue && (
          <span
            className="mr-2 inline-block rounded px-2 py-0.5 text-xs font-medium text-black"
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
          <span className="ml-1 font-semibold text-brand-danger">
            {' '}
            [{pub.award}]
          </span>
        )}
      </div>

      <div className="mt-1 text-sm text-brand-text/90">{renderInline(pub.authors)}</div>
      <div className="text-sm text-brand-text/70">{pub.venueFull}</div>
      {pub.prelim && <div className="text-sm text-brand-text/70">{pub.prelim}</div>}

      {pub.links.length > 0 && (
        <div className="mt-1 flex gap-3 text-sm">
          {pub.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
