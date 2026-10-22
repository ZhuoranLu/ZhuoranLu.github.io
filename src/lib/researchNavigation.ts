import { getNodesBounds, getViewportForBounds, type Viewport, type XYPosition } from '@xyflow/react'
import type { ResearchNode } from './researchGraph'

export interface MapSnapshot {
  positions: Map<string, XYPosition>
  viewport: Viewport
  width: number
  height: number
  compact: boolean
}

export function nodeSize(node: ResearchNode, compact = false) {
  if (node.measured?.width && node.measured?.height) return node.measured
  if (node.data.kind === 'paper') return { width: 280, height: 220 }
  if (node.data.kind === 'root') return { width: 190, height: compact ? 65 : 48 }
  const count = node.data.count ?? 0
  if (node.data.kind === 'foundation') return { width: 130, height: Math.sqrt(52 ** 2 + count * 200) + (compact ? 48 : 38) }
  const width = Math.sqrt(140 ** 2 + count * 1800)
  return { width, height: Math.max(compact ? 90 : 76, width * 0.45) }
}

export function nodeCenter(node: ResearchNode, compact = false): XYPosition {
  const size = nodeSize(node, compact)
  return { x: node.position.x + size.width! / 2, y: node.position.y + size.height! / 2 }
}

export function fitMap(nodes: ResearchNode[], width: number, height: number, compact: boolean) {
  const sized = nodes.map((node) => ({ ...node, measured: nodeSize(node, compact) }))
  return getViewportForBounds(getNodesBounds(sized), width, height, 0.1, 1, 0.18)
}

export function restoreOverview(nodes: ResearchNode[], snapshot: MapSnapshot | null, compact: boolean) {
  return nodes.map((node) => ({
    ...node,
    position: snapshot?.compact === compact ? snapshot.positions.get(node.id) ?? node.position : node.position,
  }))
}

/** Keep the expanded heading at the selected bubble's center in graph coordinates. */
export function anchorPapers(nodes: ResearchNode[], origin: XYPosition) {
  const heading = nodes.find((node) => node.id === 'selection')
  if (!heading) return nodes
  const center = nodeCenter(heading)
  return nodes.map((node) => ({ ...node, position: {
    x: node.position.x + origin.x - center.x,
    y: node.position.y + origin.y - center.y,
  } }))
}

export function transitionNodes(from: ResearchNode[], to: ResearchNode[], origin: XYPosition, progress: number) {
  const old = new Map(from.map((node) => [node.id, node]))
  const next = new Map(to.map((node) => [node.id, node]))
  const nodes = [...to, ...from.filter((node) => !next.has(node.id))]
  return nodes.map((node) => {
    const previous = old.get(node.id)
    const target = next.get(node.id)
    const size = nodeSize(node)
    const collapsed = { x: origin.x - size.width! / 2, y: origin.y - size.height! / 2 }
    const start = previous?.position ?? (node.data.kind === 'paper' ? collapsed : node.position)
    const end = target?.position ?? (node.data.kind === 'paper' ? collapsed : node.position)
    const fromOpacity = previous ? Number(previous.style?.opacity ?? 1) : 0
    const toOpacity = target ? 1 : 0
    return { ...node, position: {
      x: start.x + (end.x - start.x) * progress,
      y: start.y + (end.y - start.y) * progress,
    }, style: { ...node.style, opacity: fromOpacity + (toOpacity - fromOpacity) * progress } }
  })
}
