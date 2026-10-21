import type { Publication } from '@/types'
import { renderInline } from '@/lib/inline'
import { VENUES } from '@/data/venues'

interface Props {
  pub: Publication
}

function AwardIcon({ award }: { award: string }) {
  return <span aria-hidden>{/oral/i.test(award) ? '🗣️' : '🏆'}</span>
}

export function PublicationCard({ pub }: Props) {
  return (
    <article className="animate-fade-in flex gap-4 border-b border-brand-border py-5 last:border-b-0 sm:gap-5">
      {/* Fixed-width column so entries without a thumbnail still align. */}
      <div className="w-16 shrink-0 sm:w-28">
        {pub.thumb && (
          <img
            src={pub.thumb}
            alt=""
            loading="lazy"
            className="aspect-square w-full rounded-md bg-white object-contain p-1 shadow-[0_0_5px_rgba(0,0,0,0.25)]"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="leading-relaxed">
          {pub.venue && (
            <span
              className="mr-2 inline-flex min-w-16 translate-y-[-1px] items-center justify-center whitespace-nowrap rounded px-1.5 py-0.5 align-middle text-xs font-semibold text-black"
              style={{ backgroundColor: VENUES[pub.venue].color }}
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
            <span className="ml-1.5 inline-flex items-center gap-1 whitespace-nowrap align-baseline font-semibold text-brand-danger">
              <AwardIcon award={pub.award} />
              {pub.award}
            </span>
          )}
        </div>

        <div className="mt-1.5 text-sm text-brand-muted">{renderInline(pub.authors)}</div>
        <div className="mt-0.5 text-sm italic text-brand-subtle">{pub.venueFull}</div>
        {pub.prelim && <div className="text-sm italic text-brand-subtle">{pub.prelim}</div>}
      </div>
    </article>
  )
}
