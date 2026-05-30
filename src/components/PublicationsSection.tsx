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

  const visible = useMemo(
    () =>
      publications.filter(
        (p) =>
          (venue === 'all' || p.venueGroup === venue) &&
          (focus === 'all' || p.focus === focus) &&
          (goal === 'all' || p.goal === goal),
      ),
    [venue, focus, goal],
  )

  return (
    <Section id="publications" title="Selected Publications & Manuscripts">
      <p className="mb-4 text-sm text-brand-text/60">
        * indicates equal contributions, # indicates senior author.
      </p>

      <div className="mb-6 space-y-3 rounded-lg bg-brand-bg p-4">
        <FilterRow label="Venue" options={VENUE_OPTIONS} value={venue} onChange={setVenue} />
        <FilterRow
          question={FOCUS_QUESTION}
          options={FOCUS_OPTIONS}
          value={focus}
          onChange={setFocus}
        />
        <FilterRow
          question={GOAL_QUESTION}
          options={GOAL_OPTIONS}
          value={goal}
          onChange={setGoal}
        />
      </div>

      <div key={`${venue}-${focus}-${goal}`}>
        {visible.length === 0 ? (
          <p className="py-6 text-brand-text/60">No publications match these filters.</p>
        ) : (
          visible.map((pub) => <PublicationCard key={pub.id} pub={pub} />)
        )}
      </div>
    </Section>
  )
}
