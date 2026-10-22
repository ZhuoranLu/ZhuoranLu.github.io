import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { Publication } from '@/types'
import {
  RESEARCH_DOMAINS, selectResearchPapers,
  type ResearchSelection,
} from '@/data/research'
import { buildResearchGraph } from '@/lib/researchGraph'
import { PublicationCard } from './PublicationCard'
import './research-map.css'
import { publicationAbstracts } from '@/data/publicationAbstracts'

const ResearchCanvas = lazy(() => import('./ResearchCanvas'))
interface ResearchMapProps {
  publications: readonly Publication[]
  visible: readonly Publication[]
  selection: ResearchSelection
  showPapers?: boolean
  onSelectionChange: (selection: ResearchSelection) => void
  onOverview?: () => void
}

export function ResearchMap({ publications, visible, selection, showPapers = false, onSelectionChange, onOverview }: ResearchMapProps) {
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
  const mapContainer = useRef<HTMLDivElement>(null)
  const restoreTopicFocus = useRef(false)
  const paperTrigger = useRef<HTMLElement | null>(null)
  const graph = useMemo(() => buildResearchGraph(visible, selection, compact, showPapers), [visible, selection, compact, showPapers])
  const selectedPaper = graph.nodes.find((node) => node.id === activePaper)?.data.paper
  const abstract = selectedPaper ? publicationAbstracts[selectedPaper.id] : undefined
  useEffect(() => {
    if (activePaper && !selectedPaper) {
      setActivePaper(null)
      if (document.activeElement === document.body) mapContainer.current?.focus({ preventScroll: true })
    }
  }, [activePaper, selectedPaper])
  useEffect(() => {
    if (restoreTopicFocus.current) {
      mapContainer.current?.focus({ preventScroll: true })
      restoreTopicFocus.current = false
    }
  }, [selection])
  useEffect(() => {
    if (selectedPaper) {
      const inspector = detailClose.current?.closest('aside')
      if (inspector) {
        inspector.scrollTop = 0
        inspector.scrollIntoView({ block: 'center', behavior: 'instant' })
      }
      detailClose.current?.focus({ preventScroll: true })
    }
  }, [selectedPaper])
  const domainLabel = RESEARCH_DOMAINS.find((item) => item.id === selection.domain)?.label
  const domainHasPapers = selection.domain && selectResearchPapers(publications, { foundation: null, domain: selection.domain }).length > 0

  function select(next: ResearchSelection, restoreFocus = false) {
    restoreTopicFocus.current = restoreFocus
    setActivePaper(null)
    onSelectionChange(next)
  }

  function closeDetails() {
    setActivePaper(null)
    const target = paperTrigger.current?.isConnected ? paperTrigger.current : mapContainer.current
    target?.focus({ preventScroll: true })
  }

  function openPaper(id: string) {
    paperTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setActivePaper(id)
  }

  function backToMap() {
    setActivePaper(null)
    mapContainer.current?.focus({ preventScroll: true })
    if (onOverview) onOverview()
    else onSelectionChange({ foundation: null, domain: null })
  }

  return (
    <div ref={mapContainer} className="research-explorer" tabIndex={-1} aria-label="Research map"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && graph.expanded && !selectedPaper) { event.preventDefault(); backToMap() }
      }}>
      <div className={`research-stage ${graph.expanded ? 'is-expanded' : ''}`}>
        {graph.expanded && <button type="button" className="research-back publication-control" onClick={backToMap}>← Back to map</button>}
        <Suspense fallback={<p className="p-6 text-sm text-brand-muted">Loading interactive map…</p>}>
          <ResearchCanvas graph={graph} activePaper={selectedPaper?.id ?? null} onSelect={(next) => select(next, true)}
            onPaper={(paper) => openPaper(paper.id)} />
        </Suspense>
        {graph.expanded && graph.papers.length === 0 && <div className="research-empty" role="status">
          <p className="mb-2 font-semibold text-brand-heading">{selection.domain && !domainHasPapers ? 'Coming soon' : 'No matching papers'}</p>
          <p>{selection.domain && !domainHasPapers
            ? `Research in ${domainLabel} is coming soon.`
            : 'No publications match this intersection and the current filters. Try another area or clear the filters above.'}</p>
        </div>}
        {selectedPaper && <aside className="research-inspector" aria-label="Selected paper"
          onKeyDown={(event) => { if (event.key === 'Escape') { event.stopPropagation(); closeDetails() } }}>
          <div className="research-inspector-header mb-4 flex items-center justify-between gap-3 text-xs text-brand-muted">
            <span>Paper details · {selectedPaper.year}</span>
            <button ref={detailClose} className="rounded px-3 py-2 text-brand-heading hover:bg-brand-page" type="button" onClick={closeDetails}>Close</button>
          </div>
          <PublicationCard pub={selectedPaper} variant="detail" />
          {abstract && <section className="research-paper-abstract" aria-label="Abstract">
            <h3 className="mb-3 text-sm font-semibold text-brand-heading">Abstract</h3>
            <p className="whitespace-pre-line text-sm leading-relaxed text-brand-muted">{abstract.text}</p>
            <a className="mt-3 inline-block text-xs text-brand-primary underline underline-offset-2" href={abstract.source} target="_blank" rel="noreferrer">Read paper ↗</a>
          </section>}
        </aside>}
      </div>
      <div className="research-map-foot">
        <span>Drag to explore · + / − to zoom · hover to trace connections</span>
      </div>
    </div>
  )
}
