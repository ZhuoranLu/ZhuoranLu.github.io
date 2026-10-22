import { useEffect, useRef, useState, type RefObject } from 'react'
import { useNodesState, type ReactFlowInstance, type XYPosition } from '@xyflow/react'
import type { buildResearchGraph, ResearchNode } from '@/lib/researchGraph'
import { anchorPapers, fitMap, nodeCenter, restoreOverview, transitionNodes, type MapSnapshot } from '@/lib/researchNavigation'

type Graph = ReturnType<typeof buildResearchGraph>

export function useResearchNavigation(graph: Graph, flow: ReactFlowInstance<ResearchNode> | null, containerRef: RefObject<HTMLDivElement | null>) {
  const [nodes, setNodes, onNodesChange] = useNodesState<ResearchNode>(graph.nodes)
  const [edges, setEdges] = useState(graph.edges)
  const [transitioning, setTransitioning] = useState(false)
  const previous = useRef<Graph | null>(null)
  const snapshot = useRef<MapSnapshot | null>(null)
  const origin = useRef<XYPosition>({ x: 425, y: 200 })
  const clicked = useRef<string | null>(null)
  const inFlight = useRef(false)

  useEffect(() => {
    if (!flow) return
    const before = previous.current
    previous.current = graph
    if (!before) {
      setNodes(graph.nodes)
      setEdges(graph.edges)
      const frame = requestAnimationFrame(() => { void flow.fitView({ padding: 0.18, maxZoom: 1 }) })
      return () => cancelAnimationFrame(frame)
    }
    const current = flow.getNodes()
    const viewport = flow.getViewport()
    // React Flow's container is sized by the stage, rather than the browser viewport.
    const container = containerRef.current
    if (!container) return
    const { width, height } = container.getBoundingClientRect()
    const entering = !before.expanded && graph.expanded
    const returning = before.expanded && !graph.expanded

    if (entering) {
      if (!inFlight.current) snapshot.current = {
        positions: new Map(current.map((node) => [node.id, { ...node.position }])),
        viewport, width, height: before.compact ? 610 : 560, compact: before.compact,
      }
      const id = clicked.current ?? (graph.selection.domain ? `domain:${graph.selection.domain}` : `foundation:${graph.selection.foundation}`)
      const source = current.find((node) => node.id === id) ?? current.find((node) => node.id === 'root')
      if (source) origin.current = nodeCenter(source, before.compact)
    }
    clicked.current = null
    const targets = graph.expanded ? anchorPapers(graph.nodes, origin.current)
      : restoreOverview(graph.nodes, returning ? snapshot.current : null, graph.compact)
    const saved = snapshot.current
    const targetViewport = returning && saved && saved.compact === graph.compact && saved.width === width && saved.height === height
      ? saved.viewport : fitMap(targets, width, height, graph.compact)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const duration = reducedMotion.matches || (!before.expanded && !graph.expanded) ? 0 : 440
    let frame = 0
    let start: number | null = null
    const allEdges = new Map([...before.edges, ...graph.edges].map((edge) => [edge.id, edge]))
    setEdges([...allEdges.values()])
    inFlight.current = true
    setTransitioning(true)

    function finish() {
      setNodes(targets)
      setEdges(graph.edges)
      void flow!.setViewport(targetViewport)
      inFlight.current = false
      setTransitioning(false)
    }
    function animate(time: number) {
      start ??= time
      const t = reducedMotion.matches || !duration ? 1 : Math.min(1, (time - start) / duration)
      if (t === 1) { finish(); return }
      const eased = 1 - (1 - t) ** 3
      setNodes(transitionNodes(current, targets, origin.current, eased))
      void flow!.setViewport({
        x: viewport.x + (targetViewport.x - viewport.x) * eased,
        y: viewport.y + (targetViewport.y - viewport.y) * eased,
        zoom: viewport.zoom + (targetViewport.zoom - viewport.zoom) * eased,
      })
      frame = requestAnimationFrame(animate)
    }
    if (!duration) finish()
    else {
      setNodes(transitionNodes(current, targets, origin.current, 0))
      frame = requestAnimationFrame(animate)
    }
    return () => cancelAnimationFrame(frame)
  }, [flow, graph, setNodes, containerRef])

  return { nodes, edges, onNodesChange, transitioning, rememberOrigin: (id: string) => { clicked.current = id } }
}
