import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  ReactFlow, Background, Controls, Handle, Position,
  type NodeProps, type ReactFlowInstance,
} from '@xyflow/react'
import { FiArrowUpRight, FiCpu, FiUsers, FiGitMerge } from 'react-icons/fi'
import { PublicationCard } from './PublicationCard'
import type { Publication } from '@/types'
import { buildResearchGraph, graphNeighborhood, type ResearchNode } from '@/lib/researchGraph'
import type { ResearchSelection } from '@/data/research'
import '@xyflow/react/dist/style.css'
import './research-map.css'
import { useResearchNavigation } from './useResearchNavigation'

type Graph = ReturnType<typeof buildResearchGraph>
interface Props {
  graph: Graph
  activePaper: string | null
  onSelect: (selection: ResearchSelection) => void
  onPaper: (paper: Publication) => void
}

function ResearchGraphNode({ data }: NodeProps<ResearchNode>) {
  const Icon = data.label === 'Human' ? FiUsers : data.label === 'AI' ? FiCpu : FiGitMerge
  // A readable base area plus an area proportional to paper count. Keep fonts fixed.
  const count = data.count ?? 0
  const domainWidth = Math.sqrt(140 ** 2 + count * 1800)
  const style = {
    '--node-color': data.color,
    '--orb-size': `${Math.sqrt(52 ** 2 + count * 200)}px`,
    '--domain-width': `${domainWidth}px`,
    '--domain-height': `${Math.max(76, domainWidth * 0.45)}px`,
    opacity: data.dimmed ? 0.28 : 1,
  } as CSSProperties
  return (
    <div className={`research-node research-node-${data.kind} ${data.active ? 'is-active' : ''} ${data.empty ? 'is-empty' : ''}`} style={style}>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      {data.kind === 'root' ? <div className="research-root">{data.description && <span>{data.description}</span>}<strong>{data.label}</strong></div> : (
        <button type="button" aria-label={data.kind === 'paper' ? `Read ${data.label}` : data.empty ? `${data.label}, coming soon` : `Explore ${data.label}, ${data.count} papers`}
          aria-pressed={data.active} disabled={data.busy} title={data.kind === 'paper' ? data.label : data.description}
          onClick={data.onActivate} onFocus={() => data.onPreview?.(true)} onBlur={() => data.onPreview?.(false)}
          onMouseEnter={() => data.onPreview?.(true)} onMouseLeave={() => data.onPreview?.(false)}>
          {data.kind === 'paper' && data.paper ? <PublicationCard pub={data.paper} variant="node" /> : <>
            {data.kind === 'foundation' && <span className="research-orb"><Icon size={27} /><span className="research-orbit" /></span>}
            <span className="research-node-title">{data.label}</span>
            {data.empty && <span className="research-node-caption">Coming soon</span>}
            {data.kind === 'domain' && <FiArrowUpRight className="research-node-arrow" size={14} />}
          </>}

        </button>
      )}
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  )
}
const nodeTypes = { research: ResearchGraphNode }

export default function ResearchCanvas({ graph, activePaper, onSelect, onPaper }: Props) {
  const [flow, setFlow] = useState<ReactFlowInstance<ResearchNode> | null>(null)
  const container = useRef<HTMLDivElement>(null)
  const { nodes, edges: displayedEdges, onNodesChange, transitioning, rememberOrigin } = useResearchNavigation(graph, flow, container)
  const [hovered, setHovered] = useState<string | null>(null)
  useEffect(() => {
    setHovered(null)
  }, [graph])

  const highlighted = transitioning ? null : hovered ?? activePaper
  const neighborhood = useMemo(() => graphNeighborhood(highlighted, displayedEdges), [highlighted, displayedEdges])
  const decoratedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      busy: transitioning,
      active: node.id === highlighted,
      dimmed: Boolean(highlighted) && !neighborhood.nodes.has(node.id),
      onActivate: () => {
        if (node.data.paper) onPaper(node.data.paper)
        else if (node.data.selection) { rememberOrigin(node.id); onSelect(node.data.selection) }
      },
      onPreview: (active: boolean) => setHovered(active ? node.id : null),
    },
  }))
  const opacity = new Map(nodes.map((node) => [node.id, Number(node.style?.opacity ?? 1)]))
  const edges = displayedEdges.map((edge) => ({
    ...edge,
    className: highlighted && neighborhood.links.has(edge.id) ? 'research-edge-active' : undefined,
    style: { ...edge.style, opacity: (highlighted ? neighborhood.links.has(edge.id) ? 0.9 : 0.08 : 0.35)
      * Math.min(opacity.get(edge.source) ?? 0, opacity.get(edge.target) ?? 0),
      strokeWidth: highlighted && neighborhood.links.has(edge.id) ? 2.5 : 1.5 },
  }))
  return (
    <div ref={container} className="h-full w-full" aria-busy={transitioning}>
    <ReactFlow<ResearchNode> nodes={decoratedNodes} edges={edges} onNodesChange={onNodesChange}
      onInit={setFlow} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.14, maxZoom: 1 }}
      minZoom={0.1} maxZoom={1.8} nodesConnectable={false} nodesFocusable={false} edgesFocusable={false}
      elementsSelectable={false} deleteKeyCode={null} zoomOnScroll={false} panOnScroll={false}
      nodesDraggable={!transitioning} panOnDrag={!transitioning} zoomOnPinch={!transitioning}
      preventScrolling={false} zoomOnDoubleClick={false}
      aria-label="Interactive research map. Drag nodes or the background; use zoom controls to explore.">
      <Background color="#E2E5E8" gap={24} size={1} />
      <div inert={transitioning}>
        <Controls position="bottom-right" showInteractive={false} fitViewOptions={{ padding: 0.14, maxZoom: 1 }} />
      </div>
    </ReactFlow>
    </div>
  )
}
