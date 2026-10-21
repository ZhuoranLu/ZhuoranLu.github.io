import { describe, expect, it } from 'vitest'
import { buildResearchGraph, graphNeighborhood } from './researchGraph'
import { publications } from '@/data/publications'
import { RESEARCH_DOMAINS, RESEARCH_FOUNDATIONS, selectResearchPapers } from '@/data/research'

const overview = { foundation: null, domain: null }
describe('interactive research graph', () => {
  it('only connects foundations and domains with shared papers, leaving Education unconnected', () => {
    const graph = buildResearchGraph(publications, overview)
    const ids = new Set(graph.nodes.map((node) => node.id))
    expect(ids.size).toBe(graph.nodes.length)
    for (const edge of graph.edges) {
      expect(ids.has(edge.source) && ids.has(edge.target)).toBe(true)
    }
    for (const foundation of RESEARCH_FOUNDATIONS) for (const domain of RESEARCH_DOMAINS) {
      const count = selectResearchPapers(publications, { foundation: foundation.id, domain: domain.id }).length
      const edge = graph.edges.find((edge) => edge.source === `foundation:${foundation.id}` && edge.target === `domain:${domain.id}`)
      expect(Boolean(edge)).toBe(count > 0)
      if (edge) expect(edge.data?.count).toBe(count)
    }
    expect(graph.nodes.find((node) => node.id === 'domain:education')?.data.empty).toBe(true)
    expect(graph.edges.some((edge) => edge.target === 'domain:education')).toBe(false)
  })

  it('exposes all matching papers exactly once across pages in original order on desktop and mobile', () => {
    for (const compact of [false, true]) {
      const selection = { foundation: 'human' as const, domain: null }
      const initial = buildResearchGraph(publications, selection, 0, compact)
      const displayed = Array.from({ length: initial.pageCount }, (_, page) =>
        buildResearchGraph(publications, selection, page, compact).nodes.filter((node) => node.data.kind === 'paper').map((node) => node.id)).flat()
      expect(displayed).toEqual(selectResearchPapers(publications, selection).map((paper) => paper.id))
      expect(new Set(displayed).size).toBe(displayed.length)
    }
  })

  it('clamps stale pages after filtering and handles empty intersections', () => {
    expect(buildResearchGraph([publications[0]], { foundation: 'human', domain: null }, 99).page).toBe(0)
    const empty = buildResearchGraph(publications, { foundation: 'ai', domain: 'health' }, 99)
    expect(empty.papers).toEqual([])
    expect(empty.edges).toEqual([])
    expect(empty.page).toBe(0)
  })

  it('highlights only a hovered node and its direct neighbors without modifying the graph', () => {
    const graph = buildResearchGraph(publications, overview)
    const original = structuredClone(graph)
    const neighborhood = graphNeighborhood('domain:health', graph.edges)
    expect([...neighborhood.nodes].sort()).toEqual(['domain:health', 'foundation:human', 'foundation:interaction'])
    expect(neighborhood.links.size).toBe(2)
    expect(graphNeighborhood(null, graph.edges).nodes.size).toBe(0)
    expect(graph).toEqual(original)
  })
})
