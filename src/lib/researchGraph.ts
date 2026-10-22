import type { Node, Edge } from '@xyflow/react'
import type { Publication } from '@/types'
import { RESEARCH_DOMAINS, RESEARCH_FOUNDATIONS, selectResearchPapers, type ResearchDomain, type ResearchSelection } from '@/data/research'

// Fixed, staggered positions keep the overview organic without jumping on updates.
const domainPositions: Record<ResearchDomain, { desktop: [number, number]; compact: [number, number] }> = {
  'creative-work': { desktop: [20, 380], compact: [0, 315] },
  'social-media': { desktop: [270, 340], compact: [245, 350] },
  health: { desktop: [610, 420], compact: [30, 435] },
  education: { desktop: [90, 545], compact: [230, 475] },
  'finance-law': { desktop: [420, 510], compact: [0, 565] },
  'urban-science': { desktop: [650, 570], compact: [250, 605] },
  'decision-making': { desktop: [210, 660], compact: [35, 720] },
}

export type ResearchNodeData = {
  kind: 'root' | 'foundation' | 'domain' | 'paper'
  label: string
  description: string
  color: string
  count?: number
  empty?: boolean
  paper?: Publication
  selection?: ResearchSelection
  active?: boolean
  dimmed?: boolean
  busy?: boolean
  onActivate?: () => void
  onPreview?: (active: boolean) => void
}
export type ResearchNode = Node<ResearchNodeData, 'research'>

/** Edges encode editorial membership/shared papers, never citation or causation. */
export function buildResearchGraph(publications: readonly Publication[], selection: ResearchSelection, compact = false, showPapers = false) {
  const nodes: ResearchNode[] = []
  const edges: Edge[] = []
  const papers = selectResearchPapers(publications, selection)
  const expanded = Boolean(selection.foundation || selection.domain || showPapers)
  const addEdge = (source: string, target: string, color: string, count?: number) => edges.push({
    id: `${source}--${target}`, source, target, type: 'default',
    style: { stroke: color, strokeWidth: 1.5, opacity: 0.35 },
    data: { count },
  })
  const addNode = (id: string, x: number, y: number, data: ResearchNodeData) => nodes.push({
    id, type: 'research', position: { x, y }, data,
  })

  if (!expanded) {
    addNode('root', compact ? 115 : 330, 0, { kind: 'root', label: 'Human–AI', description: '', color: '#6F88A6' })
    RESEARCH_FOUNDATIONS.forEach((item, index) => {
      const id = `foundation:${item.id}`
      addNode(id, compact ? index * 145 : 90 + index * 270, 130, {
        kind: 'foundation', label: item.label, description: item.description, color: item.color,
        count: selectResearchPapers(publications, { foundation: item.id, domain: null }).length,
        selection: { foundation: item.id, domain: null },
      })
      addEdge('root', id, item.color)
    })
    RESEARCH_DOMAINS.forEach((item) => {
      const id = `domain:${item.id}`
      const count = selectResearchPapers(publications, { foundation: null, domain: item.id }).length
      const [x, y] = domainPositions[item.id][compact ? 'compact' : 'desktop']
      addNode(id, x, y, {
        kind: 'domain', label: item.label, description: item.description, color: '#6F88A6', count,
        empty: item.id === 'education' && count === 0,
        selection: { foundation: null, domain: item.id },
      })
      RESEARCH_FOUNDATIONS.forEach((foundation) => {
        const shared = selectResearchPapers(publications, { foundation: foundation.id, domain: item.id }).length
        if (shared) addEdge(`foundation:${foundation.id}`, id, foundation.color, shared)
      })
    })
  } else {
    const foundation = RESEARCH_FOUNDATIONS.find((item) => item.id === selection.foundation)
    const domain = RESEARCH_DOMAINS.find((item) => item.id === selection.domain)
    const color = foundation?.color ?? '#6F88A6'
    const columns = Math.max(1, Math.min(compact ? 3 : 5, Math.ceil(Math.sqrt(papers.length))))
    const gridWidth = (columns - 1) * 330 + 280
    addNode('selection', (gridWidth - 190) / 2, 0, {
      kind: 'root', label: [foundation?.label, domain?.label].filter(Boolean).join(' × ') || 'Matching papers',
      description: 'Select a paper to read', color,
    })
    papers.forEach((paper, index) => {
      addNode(paper.id, (index % columns) * 330, 170 + Math.floor(index / columns) * 260, {
        kind: 'paper', label: paper.title, description: `${paper.venue} · ${paper.year}`, color, paper,
      })
      addEdge('selection', paper.id, color)
    })
  }
  return { nodes, edges, papers, expanded, selection, compact }
}

export function graphNeighborhood(id: string | null, edges: readonly Edge[]) {
  const nodes = new Set<string>(id ? [id] : [])
  const links = new Set<string>()
  for (const edge of edges) {
    if (edge.source === id || edge.target === id) {
      nodes.add(edge.source)
      nodes.add(edge.target)
      links.add(edge.id)
    }
  }
  return { nodes, links }
}
