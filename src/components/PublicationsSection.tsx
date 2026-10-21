import { useMemo, useState } from 'react'
import type { VenueGroup, Focus, Goal, Publication } from '@/types'
import { Section } from './Section'
import { FilterRow } from './FilterBar'
import { PublicationCard } from './PublicationCard'
import { ResearchMap } from './ResearchMap'
import type { ResearchSelection } from '@/data/research'
import { filterPublications } from '@/lib/publications'
import {
  VENUE_OPTIONS,
  FOCUS_OPTIONS,
  GOAL_OPTIONS,
  FOCUS_QUESTION,
  GOAL_QUESTION,
} from '@/data/filters'

interface PublicationsSectionProps {
  publications: readonly Publication[]
  id: string
  title: string
}

export function PublicationsSection({ publications, id, title }: PublicationsSectionProps) {
  const [venue, setVenue] = useState<VenueGroup | 'all'>('all')
  const [focus, setFocus] = useState<Focus | 'all'>('all')
  const [goal, setGoal] = useState<Goal | 'all'>('all')
  const [view, setView] = useState<'list' | 'map'>('list')
  const [mapSelection, setMapSelection] = useState<ResearchSelection>({ foundation: null, domain: null })

  const visible = useMemo(
    () => filterPublications(publications, { venue, focus, goal }),
    [publications, venue, focus, goal],
  )

  const filters = (
    <div className="space-y-4 rounded-xl bg-brand-page p-5">
      <FilterRow label="Venue" options={VENUE_OPTIONS} value={venue} onChange={setVenue} />
      <FilterRow
        label="Focus"
        question={FOCUS_QUESTION}
        options={FOCUS_OPTIONS}
        value={focus}
        onChange={setFocus}
      />
      <FilterRow
        label="Goal"
        question={GOAL_QUESTION}
        options={GOAL_OPTIONS}
        value={goal}
        onChange={setGoal}
      />
    </div>
  )

  return (
    <Section id={id} title={title}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-brand-subtle">
          * indicates equal contributions, † indicates senior author.
        </p>
        <div role="group" aria-label="Publication view" className="inline-flex rounded-lg bg-brand-page p-1 ring-1 ring-brand-border">
          {(['list', 'map'] as const).map((mode) => (
            <button key={mode} type="button" aria-pressed={view === mode}
              onClick={() => setView(mode)}
              className={`rounded-md px-3 py-2 text-sm font-medium ${view === mode ? 'bg-white text-brand-heading shadow-sm' : 'text-brand-muted hover:text-brand-heading'}`}>
              {mode === 'list' ? 'List' : 'Research Map'}
            </button>
          ))}
        </div>
      </div>

      {view === 'map' ? (
        <details className="mb-4 rounded-lg border border-brand-border">
          <summary className="cursor-pointer px-4 py-3 text-xs text-brand-muted">Refine papers · {visible.length} of {publications.length} included</summary>
          {filters}
        </details>
      ) : filters}

      {view === 'list' && <p role="status" className="mb-3 mt-5 text-xs text-brand-muted">{visible.length} of {publications.length} papers</p>}
      <div>
        {view === 'map' ? (
          <ResearchMap publications={publications} visible={visible} selection={mapSelection} onSelectionChange={setMapSelection} />
        ) : visible.length === 0 ? (
          <p className="py-6 text-brand-subtle">No publications match these filters.</p>
        ) : (
          visible.map((pub) => <PublicationCard key={pub.id} pub={pub} />)
        )}
      </div>
    </Section>
  )
}
