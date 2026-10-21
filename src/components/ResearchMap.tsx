import { useId } from 'react'
import type { Publication } from '@/types'
import {
  RESEARCH_DOMAINS, RESEARCH_FOUNDATIONS, selectResearchPapers,
  type ResearchSelection,
} from '@/data/research'
import { PublicationCard } from './PublicationCard'

interface ResearchMapProps {
  publications: readonly Publication[]
  visible: readonly Publication[]
  selection: ResearchSelection
  onSelectionChange: (selection: ResearchSelection) => void
}

const paperCount = (count: number) => `${count} ${count === 1 ? 'paper' : 'papers'}`

export function ResearchMap({ publications, visible, selection, onSelectionChange }: ResearchMapProps) {
  const mapId = useId()
  const { foundation, domain } = selection
  const selectedPapers = selectResearchPapers(visible, selection)
  const foundationLabel = RESEARCH_FOUNDATIONS.find((item) => item.id === foundation)?.label
  const domainLabel = RESEARCH_DOMAINS.find((item) => item.id === domain)?.label
  const selectionLabel = [foundationLabel, domainLabel].filter(Boolean).join(' × ')
  const hasSelection = Boolean(foundation || domain)
  const domainHasPapers = domain && selectResearchPapers(publications, { foundation: null, domain }).length > 0

  return (
    <div>
      <div className="rounded-2xl border border-brand-border bg-brand-page p-4 sm:p-6">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted">Research landscape</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Human–AI</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-brand-muted">
            Understanding the human, the AI, and their interaction — and bringing these questions into real-world domains.
          </p>
        </div>

        <fieldset className="mt-7 min-w-0">
          <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-muted">Foundations</legend>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {RESEARCH_FOUNDATIONS.map((item) => {
              const count = selectResearchPapers(visible, { foundation: item.id, domain }).length
              const active = foundation === item.id
              return (
                <button key={item.id} type="button" aria-pressed={active} aria-controls={`${mapId}-results`}
                  onClick={() => onSelectionChange({ foundation: active ? null : item.id, domain })}
                  className={`min-w-0 rounded-xl border bg-white px-1 py-4 text-center transition-colors sm:px-3 ${active ? 'border-brand-primary ring-2 ring-brand-primary' : 'border-brand-border hover:border-brand-primary'}`}>
                  <span aria-hidden="true" className="mx-auto mb-3 block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="block break-words text-[11px] font-semibold text-brand-heading sm:text-base">{item.label}</span>
                  <span className="mt-2 hidden min-h-10 text-xs leading-5 text-brand-muted sm:block">{item.description}</span>
                  <span className="mt-2 block text-[10px] text-brand-muted sm:text-xs">{paperCount(count)}</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="relative h-24" aria-hidden="true">
          <svg viewBox="0 0 600 96" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {RESEARCH_FOUNDATIONS.map((item, index) => (
              <path key={item.id} d={`M${100 + index * 200} 0 V14 Q${100 + index * 200} 34 300 34 V50`}
                fill="none" stroke={item.color} strokeWidth={foundation === item.id ? 2 : 1}
                opacity={foundation && foundation !== item.id ? 0.15 : 0.6} />
            ))}
            <path d="M300 70 V96" stroke="#6F88A6" fill="none" />
          </svg>
          <span className="absolute inset-x-0 top-[47px] text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
            <span className="bg-brand-page px-3">In context</span>
          </span>
        </div>

        <fieldset className="min-w-0">
          <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-muted">Vertical domains</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {RESEARCH_DOMAINS.map((item) => {
              const count = selectResearchPapers(visible, { foundation, domain: item.id }).length
              const total = selectResearchPapers(publications, { foundation: null, domain: item.id }).length
              const active = domain === item.id
              return (
                <button key={item.id} type="button" aria-pressed={active} aria-controls={`${mapId}-results`} title={item.description}
                  onClick={() => onSelectionChange({ foundation, domain: active ? null : item.id })}
                  className={`min-w-0 rounded-xl border px-2 py-3 text-left transition-colors sm:px-3 ${active ? 'border-brand-primary bg-white ring-2 ring-brand-primary' : total ? 'border-brand-border bg-white hover:border-brand-primary' : 'border-dashed border-brand-border hover:bg-white'}`}>
                  <span className="block break-words text-[11px] font-semibold text-brand-heading sm:text-xs">{item.label}</span>
                  <span className="mt-1.5 block text-[10px] leading-4 text-brand-muted">{total ? paperCount(count) : 'No papers yet'}</span>
                </button>
              )
            })}
          </div>
        </fieldset>
        <p className="mt-5 text-xs leading-5 text-brand-muted">
          Choose a foundation, a domain, or their intersection. Papers may span multiple areas;
          foundational work can stand on its own without an application domain.
        </p>
      </div>

      <div id={`${mapId}-results`} className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm font-semibold text-brand-heading">
            {hasSelection ? `${selectionLabel} · ${paperCount(selectedPapers.length)}` : 'Choose an area to explore its papers.'}
          </p>
          {hasSelection && <button type="button" className="rounded px-2 py-2 text-sm text-brand-heading hover:underline"
            onClick={() => onSelectionChange({ foundation: null, domain: null })}>Clear map selection</button>}
        </div>
        {hasSelection && (selectedPapers.length
          ? selectedPapers.map((paper) => <PublicationCard key={paper.id} pub={paper} />)
          : <p className="py-5 text-sm text-brand-muted">
              {domain && !domainHasPapers
                ? `No publications are assigned to ${domainLabel} yet.`
                : 'No publications match this intersection and the current filters. Try another area or clear the filters above.'}
            </p>)}
      </div>
    </div>
  )
}
