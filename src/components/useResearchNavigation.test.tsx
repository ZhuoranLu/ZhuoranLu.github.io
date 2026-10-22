// @vitest-environment jsdom
import { act, useRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import type { ReactFlowInstance, Viewport } from '@xyflow/react'
import { useResearchNavigation } from './useResearchNavigation'
import { buildResearchGraph, type ResearchNode } from '@/lib/researchGraph'
import { publications } from '@/data/publications'

const overview = buildResearchGraph(publications, { foundation: null, domain: null })
const human = buildResearchGraph(publications, { foundation: 'human', domain: null })
const education = buildResearchGraph(publications, { foundation: null, domain: 'education' })
let host: HTMLDivElement
let root: Root
let viewport: Viewport
let displayed: ResearchNode[]
let reduced: boolean
let navigation: ReturnType<typeof useResearchNavigation>
let flow: ReactFlowInstance<ResearchNode>

function Harness({ graph }: { graph: typeof overview }) {
  const container = useRef<HTMLDivElement>(null)
  navigation = useResearchNavigation(graph, flow, container)
  displayed = navigation.nodes
  return <div ref={container} data-expanded={graph.expanded} />
}
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  vi.useFakeTimers()
  reduced = false
  viewport = { x: 120, y: -35, zoom: 0.7 }
  displayed = overview.nodes
  vi.stubGlobal('matchMedia', () => ({ matches: reduced }))
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => window.setTimeout(() => cb(Date.now()), 16))
  vi.stubGlobal('cancelAnimationFrame', (id: number) => window.clearTimeout(id))
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    return { width: 850, height: this.dataset.expanded === 'true' ? 640 : 560 } as DOMRect
  })
  flow = {
    getNodes: () => displayed,
    getViewport: () => viewport,
    setViewport: (next: Viewport) => { viewport = next; return Promise.resolve(true) },
    fitView: vi.fn(() => Promise.resolve(true)),
  } as unknown as ReactFlowInstance<ResearchNode>
  host = document.createElement('div')
  document.body.append(host)
  root = createRoot(host)
})
afterEach(async () => {
  await act(async () => root.unmount())
  host.remove()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})
async function render(graph: typeof overview) { await act(async () => root.render(<Harness graph={graph} />)) }
async function advance(ms = 500) { await act(async () => vi.advanceTimersByTimeAsync(ms)) }

describe('spatial research navigation', () => {
  it('expands from a dragged bubble and restores dragged positions and the exact viewport on return', async () => {
    await render(overview)
    await advance()
    await act(async () => navigation.onNodesChange([{ id: 'foundation:human', type: 'position', position: { x: 310, y: 240 } }]))
    const saved = { ...viewport }
    navigation.rememberOrigin('foundation:human')
    await render(human)
    expect(navigation.transitioning).toBe(true)
    const startingPapers = displayed.filter((node) => node.data.kind === 'paper')
    expect(new Set(startingPapers.map((node) => JSON.stringify(node.position))).size).toBe(1)
    expect(startingPapers[0].position.x).toBe(310 + 65 - 140)
    await advance()
    expect(displayed.filter((node) => node.data.kind === 'paper')).toHaveLength(human.papers.length)
    await render(overview)
    await advance()
    expect(displayed.find((node) => node.id === 'foundation:human')?.position).toEqual({ x: 310, y: 240 })
    expect(viewport).toEqual(saved)
    expect(navigation.transitioning).toBe(false)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('honors a rapid return and does not lose the overview when visiting an empty area', async () => {
    await render(overview)
    await advance()
    const saved = { ...viewport }
    await render(human)
    await advance(80)
    await render(education)
    await advance(32)
    await render(overview)
    await advance()
    expect(displayed.map((node) => node.id)).toEqual(overview.nodes.map((node) => node.id))
    expect(viewport).toEqual(saved)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('skips movement with reduced motion and cancels pending work on unmount', async () => {
    await render(overview)
    await advance()
    reduced = true
    await render(human)
    expect(navigation.transitioning).toBe(false)
    expect(displayed.map((node) => node.id)).toEqual(human.nodes.map((node) => node.id))
    expect(vi.getTimerCount()).toBe(0)
    reduced = false
    await render(overview)
    expect(navigation.transitioning).toBe(true)
    await act(async () => root.render(null))
    expect(vi.getTimerCount()).toBe(0)
  })
})
