import type { Publication } from '@/types'
import { renderInline } from '@/lib/inline'
import { VENUES } from '@/data/venues'

interface Props {
  pub: Publication
  variant?: 'list' | 'node' | 'detail'
}

const variantClasses = {
  list: 'publication-card-list',
  node: 'publication-card-node',
  detail: 'publication-card-detail',
} as const

/** One paper presentation; views only change its density and arrangement. */
export function PublicationCard({ pub, variant = 'list' }: Props) {
  const Container = variant === 'node' ? 'span' : 'article'
  const Block = variant === 'node' ? 'span' : 'div'
  return (
    <Container className={`publication-card ${variantClasses[variant]}`} data-publication-id={pub.id}>
      <Block className="publication-thumbnail">
        {pub.thumb && <img src={pub.thumb} alt="" loading="lazy" draggable={false} />}
      </Block>
      <Block className="publication-body">
        <Block className="publication-title">
          <span className="publication-venue" style={{ backgroundColor: VENUES[pub.venue].color }}>{pub.venue}</span>
          {pub.url && variant !== 'node'
            ? <a href={pub.url} target="_blank" rel="noopener noreferrer">{pub.title}</a>
            : <span>{pub.title}</span>}
        </Block>
        <Block className="publication-authors">{renderInline(pub.authors)}</Block>
        {variant !== 'node' && <>
          <Block className="publication-venue-full">{pub.venueFull}</Block>
          {pub.prelim && <Block className="publication-venue-full">{pub.prelim}</Block>}
        </>}
        {pub.award && <Block className="publication-award"><span aria-hidden="true">{/oral/i.test(pub.award) ? '🗣️' : '🏆'}</span> {pub.award}</Block>}
      </Block>
    </Container>
  )
}
