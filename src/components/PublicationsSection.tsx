import { useMemo, useState } from 'react'
import type { VenueGroup, Focus, Goal } from '@/types'
import { Section } from './Section'
import { FilterRow } from './FilterBar'
import { PublicationCard } from './PublicationCard'
import { publications } from '@/data/publications'
import {
  VENUE_OPTIONS,
  FOCUS_OPTIONS,
  GOAL_OPTIONS,
  FOCUS_QUESTION,
  GOAL_QUESTION,
} from '@/data/filters'

export function PublicationsSection() {
  const [venue, setVenue] = useState<VenueGroup | 'all'>('all')
  const [focus, setFocus] = useState<Focus | 'all'>('all')
  const [goal, setGoal] = useState<Goal | 'all'>('all')

  const visible = useMemo(() => {
    const has = <T,>(field: T | T[], value: T) =>
      Array.isArray(field) ? field.includes(value) : field === value
    return publications.filter(
      (p) =>
        (venue === 'all' || p.venueGroup === venue) &&
        (focus === 'all' || has(p.focus, focus)) &&
        (goal === 'all' || has(p.goal, goal)),
    )
  }, [venue, focus, goal])

  return (
    <Section id="publications" title="Selected Publications & Manuscripts">
      <p className="mb-5 text-sm text-brand-subtle">
        * indicates equal contributions, # indicates senior author.
      </p>

      <div className="mb-8 space-y-4 rounded-xl bg-brand-page p-5">
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

      <div key={`${venue}-${focus}-${goal}`}>
        {visible.length === 0 ? (
          <p className="py-6 text-brand-subtle">No publications match these filters.</p>
        ) : (
          visible.map((pub) => <PublicationCard key={pub.id} pub={pub} />)
        )}
      </div>
    </Section>
  )
}
