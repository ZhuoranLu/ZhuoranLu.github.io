import { useEffect, useMemo, useRef, useState } from 'react'
import type { VenueGroup, Focus, Goal, Publication } from '@/types'
import { Section } from './Section'
import { FilterRow } from './FilterBar'
import { PublicationCard } from './PublicationCard'
import { ResearchMap } from './ResearchMap'
import { RESEARCH_FOUNDATIONS, RESEARCH_DOMAINS, selectResearchPapers, type ResearchSelection } from '@/data/research'
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
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'list' | 'map'>('list')
  const [requestedView, setRequestedView] = useState<'list' | 'map'>('list')
  const [leaving, setLeaving] = useState(false)
  const switchTimer = useRef<number | undefined>(undefined)
  const enterFrame = useRef<number | undefined>(undefined)
  const [mapSelection, setMapSelection] = useState<ResearchSelection>({ foundation: null, domain: null })

  function cancelPendingSwitch() {
    window.clearTimeout(switchTimer.current)
    if (enterFrame.current !== undefined) window.cancelAnimationFrame(enterFrame.current)
  }

  useEffect(() => () => {
    window.clearTimeout(switchTimer.current)
    if (enterFrame.current !== undefined) window.cancelAnimationFrame(enterFrame.current)
  }, [])

  function changeView(next: 'list' | 'map') {
    cancelPendingSwitch()
    setRequestedView(next)
    // Start loading the canvas while the outgoing view fades out.
    if (next === 'map') void import('./ResearchCanvas')
    if (next === view || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setView(next)
      setLeaving(false)
      return
    }
    setLeaving(true)
    switchTimer.current = window.setTimeout(() => {
      setView(next)
      // Commit the new content at zero opacity before fading it into place.
      enterFrame.current = window.requestAnimationFrame(() => {
        enterFrame.current = window.requestAnimationFrame(() => setLeaving(false))
      })
    }, 120)
  }

  const visible = useMemo(
    () => selectResearchPapers(filterPublications(publications, { venue, focus, goal }), mapSelection)
      .filter((paper) => `${paper.title} ${paper.authors} ${paper.venue} ${paper.venueFull}`.toLowerCase().includes(query.trim().toLowerCase())),
    [publications, venue, focus, goal, mapSelection, query],
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
            <button key={mode} type="button" aria-pressed={requestedView === mode}
              onClick={() => changeView(mode)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${requestedView === mode ? 'bg-white text-brand-heading shadow-sm' : 'text-brand-muted hover:text-brand-heading'}`}>
              {mode === 'list' ? 'List' : 'Research Map'}
            </button>
          ))}
        </div>
      </div>

      <div className="publication-toolbar">
        <div className="flex flex-wrap items-end gap-3">
          <label className="publication-field">
            <span>Foundation</span>
            <select aria-label="Research foundation" value={mapSelection.foundation ?? ''}
              onChange={(event) => setMapSelection({ ...mapSelection, foundation: event.target.value as ResearchSelection['foundation'] || null })}>
              <option value="">All foundations</option>
              {RESEARCH_FOUNDATIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label className="publication-field">
            <span>Domain</span>
            <select aria-label="Application domain" value={mapSelection.domain ?? ''}
              onChange={(event) => setMapSelection({ ...mapSelection, domain: event.target.value as ResearchSelection['domain'] || null })}>
              <option value="">All domains</option>
              {RESEARCH_DOMAINS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label className="publication-field min-w-0 flex-1 basis-48">
            <span>Search</span>
            <input type="search" aria-label="Search publications" placeholder="Title, author, or venue" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer text-xs text-brand-muted">More filters</summary>
          <div className="mt-3">{filters}</div>
        </details>
      </div>
      <div className="mb-4 flex min-h-10 flex-wrap items-center justify-between gap-2">
        <p role="status" className="text-xs text-brand-muted">{visible.length} of {publications.length} papers</p>
        {(mapSelection.foundation || mapSelection.domain || query || venue !== 'all' || focus !== 'all' || goal !== 'all') &&
          <button className="publication-control" type="button" onClick={() => {
            setMapSelection({ foundation: null, domain: null }); setQuery(''); setVenue('all'); setFocus('all'); setGoal('all')
          }}>Clear filters</button>}
      </div>
      <div className={`publication-view ${leaving ? 'publication-view-leaving' : ''}`} inert={leaving} aria-busy={leaving}>
        <div>
          {view === 'map' ? (
            <ResearchMap publications={publications} visible={visible} selection={mapSelection}
              showPapers={Boolean(query.trim() || venue !== 'all' || focus !== 'all' || goal !== 'all')}
              onSelectionChange={setMapSelection} />
          ) : visible.length === 0 ? (
            <p className="py-6 text-brand-subtle">No publications match these filters.</p>
          ) : (
            visible.map((pub) => <PublicationCard key={pub.id} pub={pub} />)
          )}
        </div>
      </div>
    </Section>
  )
}
