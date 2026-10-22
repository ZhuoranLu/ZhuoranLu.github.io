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

  it('puts every matching paper on one canvas, in order, for every foundation on desktop and mobile', () => {
    for (const compact of [false, true]) for (const foundation of RESEARCH_FOUNDATIONS) {
      const selection = { foundation: foundation.id, domain: null }
      const graph = buildResearchGraph(publications, selection, compact)
      const displayed = graph.nodes.filter((node) => node.data.kind === 'paper').map((node) => node.id)
      const matching = selectResearchPapers(publications, selection).map((paper) => paper.id)
      expect(displayed).toEqual(matching)
      expect(displayed.length).toBeGreaterThan(6)
      expect(new Set(displayed).size).toBe(displayed.length)
      expect(graph.edges.map((edge) => edge.target)).toEqual(matching)
    }
  })

  it('handles filtered subsets and empty intersections', () => {
    expect(buildResearchGraph([publications[0]], { foundation: 'human', domain: null }).papers).toEqual([publications[0]])
    const empty = buildResearchGraph(publications.filter((paper) => paper.id === 'pub-digital-privacy-end-of-life-care'), { foundation: 'ai', domain: 'health' })
    expect(empty.papers).toEqual([])
    expect(empty.edges).toEqual([])
  })

  it('highlights only a hovered node and its direct neighbors without modifying the graph', () => {
    const graph = buildResearchGraph(publications, overview)
    const original = structuredClone(graph)
    const neighborhood = graphNeighborhood('domain:health', graph.edges)
    expect([...neighborhood.nodes].sort()).toEqual(['domain:health', 'foundation:ai', 'foundation:human', 'foundation:interaction'])
    expect(neighborhood.links.size).toBe(3)
    expect(graphNeighborhood(null, graph.edges).nodes.size).toBe(0)
    expect(graph).toEqual(original)
  })
})
