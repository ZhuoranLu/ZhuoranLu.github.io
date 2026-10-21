import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { Publication } from '@/types'
import {
  RESEARCH_DOMAINS, RESEARCH_FOUNDATIONS, selectResearchPapers,
  type ResearchSelection,
} from '@/data/research'
import { buildResearchGraph } from '@/lib/researchGraph'
import { renderInline } from '@/lib/inline'
import './research-map.css'

const ResearchCanvas = lazy(() => import('./ResearchCanvas'))
interface ResearchMapProps {
  publications: readonly Publication[]
  visible: readonly Publication[]
  selection: ResearchSelection
  onSelectionChange: (selection: ResearchSelection) => void
}

export function ResearchMap({ publications, visible, selection, onSelectionChange }: ResearchMapProps) {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)')
    const update = () => setCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const [activePaper, setActivePaper] = useState<string | null>(null)
  const detailClose = useRef<HTMLButtonElement>(null)
  const overviewButton = useRef<HTMLButtonElement>(null)
  const foundationPicker = useRef<HTMLSelectElement>(null)
  const restoreTopicFocus = useRef(false)
  const paperTrigger = useRef<HTMLElement | null>(null)
  const graph = useMemo(() => buildResearchGraph(visible, selection, compact), [visible, selection, compact])
  const selectedPaper = graph.papers.find((paper) => paper.id === activePaper)
  useEffect(() => {
    if (activePaper && !selectedPaper) setActivePaper(null)
  }, [activePaper, selectedPaper])
  useEffect(() => {
    if (restoreTopicFocus.current) {
      (overviewButton.current ?? foundationPicker.current)?.focus({ preventScroll: true })
      restoreTopicFocus.current = false
    }
  }, [selection])
  useEffect(() => {
    if (selectedPaper) {
      detailClose.current?.closest('aside')?.scrollIntoView({ block: 'center', behavior: 'instant' })
      detailClose.current?.focus({ preventScroll: true })
    }
  }, [selectedPaper])
  const foundationLabel = RESEARCH_FOUNDATIONS.find((item) => item.id === selection.foundation)?.label
  const domainLabel = RESEARCH_DOMAINS.find((item) => item.id === selection.domain)?.label
  const title = [foundationLabel, domainLabel].filter(Boolean).join(' × ')
  const domainHasPapers = selection.domain && selectResearchPapers(publications, { foundation: null, domain: selection.domain }).length > 0

  function select(next: ResearchSelection, restoreFocus = false) {
    restoreTopicFocus.current = restoreFocus
    setActivePaper(null)
    onSelectionChange(next)
  }

  function closeDetails() {
    setActivePaper(null)
    paperTrigger.current?.focus({ preventScroll: true })
  }

  function openPaper(id: string) {
    paperTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setActivePaper(id)
  }

  return (
    <div className="research-explorer">
      <div className="research-toolbar">
        <div><h3>{graph.expanded ? title : 'Explore my research'}</h3>
          <p>{graph.expanded ? 'Select a paper to open its details.' : 'Follow a question. Discover the work behind it.'}</p></div>
        {graph.expanded && <button ref={overviewButton} type="button" onClick={() => select({ foundation: null, domain: null }, true)}>← Overview</button>}
        <div className="flex w-full flex-wrap gap-2">
          <select ref={foundationPicker} aria-label="Research foundation" value={selection.foundation ?? ''}
            onChange={(event) => select({ ...selection, foundation: event.target.value as ResearchSelection['foundation'] || null })}>
            <option value="">All foundations</option>
            {RESEARCH_FOUNDATIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <select aria-label="Application domain" value={selection.domain ?? ''}
            onChange={(event) => select({ ...selection, domain: event.target.value as ResearchSelection['domain'] || null })}>
            <option value="">All domains</option>
            {RESEARCH_DOMAINS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <span role="status" className="self-center text-xs text-brand-muted">
            {graph.expanded ? `${graph.papers.length} ${graph.papers.length === 1 ? 'paper' : 'papers'} · all shown` : 'Click a node to explore'}
          </span>
          {graph.expanded && graph.papers.length > 0 && <select aria-label="Find a paper" className="w-full" value={selectedPaper?.id ?? ''}
            onChange={(event) => { if (event.target.value) openPaper(event.target.value) }}>
            <option value="">Find a paper…</option>
            {graph.papers.map((paper) => <option key={paper.id} value={paper.id}>{paper.title}</option>)}
          </select>}
        </div>
      </div>
      <div className={`research-stage ${graph.expanded ? 'is-expanded' : ''}`}>
        {(!graph.expanded || graph.papers.length > 0) && <Suspense fallback={<p className="p-6 text-sm text-brand-muted">Loading interactive map…</p>}>
          <ResearchCanvas graph={graph} activePaper={selectedPaper?.id ?? null} onSelect={(next) => select(next, true)}
            onPaper={(paper) => openPaper(paper.id)} />
        </Suspense>}
        {graph.expanded && graph.papers.length === 0 && <div className="research-empty" role="status">
          <p className="mb-2 font-semibold text-brand-heading">{selection.domain && !domainHasPapers ? 'No papers yet' : 'No matching papers'}</p>
          <p>{selection.domain && !domainHasPapers
            ? `No publications are assigned to ${domainLabel} yet.`
            : 'No publications match this intersection and the current filters. Try another area or clear the filters above.'}</p>
        </div>}
        {selectedPaper && <aside className="research-inspector" aria-label="Selected paper"
          onKeyDown={(event) => { if (event.key === 'Escape') { event.stopPropagation(); closeDetails() } }}>
          <div className="mb-4 flex items-center justify-between gap-3 text-xs text-brand-muted">
            <span>Paper details · {selectedPaper.year}</span>
            <button ref={detailClose} className="rounded px-3 py-2 text-brand-heading hover:bg-brand-page" type="button" onClick={closeDetails}>Close</button>
          </div>
          {selectedPaper.thumb && <img className="mb-4 h-32 w-full rounded-lg bg-brand-page object-contain p-3" src={selectedPaper.thumb} alt="" />}
          <p className="mb-2 text-xs font-semibold text-brand-muted">{selectedPaper.venue}</p>
          <h4 className="text-base font-semibold leading-relaxed">{selectedPaper.url
            ? <a href={selectedPaper.url} target="_blank" rel="noopener noreferrer">{selectedPaper.title} ↗</a>
            : selectedPaper.title}</h4>
          <p className="mt-3 text-xs leading-relaxed text-brand-muted">{renderInline(selectedPaper.authors)}</p>
          <p className="mt-3 text-xs italic leading-relaxed text-brand-muted">{selectedPaper.venueFull}</p>
          {selectedPaper.award && <p className="mt-3 text-xs font-semibold text-brand-heading">{selectedPaper.award}</p>}
          {selectedPaper.prelim && <p className="mt-3 text-xs text-brand-muted">{selectedPaper.prelim}</p>}
        </aside>}
      </div>
      <div className="research-map-foot">
        <span>Drag to explore · + / − to zoom · hover to trace connections</span>

      </div>
    </div>
  )
}
