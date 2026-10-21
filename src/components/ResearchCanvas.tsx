import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  ReactFlow, Background, Controls, Handle, Position, useNodesState,
  type NodeProps, type ReactFlowInstance,
} from '@xyflow/react'
import { FiArrowUpRight, FiCpu, FiUsers, FiGitMerge, FiFileText } from 'react-icons/fi'
import type { Publication } from '@/types'
import { buildResearchGraph, graphNeighborhood, type ResearchNode } from '@/lib/researchGraph'
import type { ResearchSelection } from '@/data/research'
import '@xyflow/react/dist/style.css'
import './research-map.css'

type Graph = ReturnType<typeof buildResearchGraph>
interface Props {
  graph: Graph
  activePaper: string | null
  onSelect: (selection: ResearchSelection) => void
  onPaper: (paper: Publication) => void
}

function ResearchGraphNode({ data }: NodeProps<ResearchNode>) {
  const Icon = data.label === 'Human' ? FiUsers : data.label === 'AI' ? FiCpu : FiGitMerge
  const style = { '--node-color': data.color, opacity: data.dimmed ? 0.28 : 1 } as CSSProperties
  return (
    <div className={`research-node research-node-${data.kind} ${data.active ? 'is-active' : ''} ${data.empty ? 'is-empty' : ''}`} style={style}>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      {data.kind === 'root' ? <div className="research-root"><span>{data.description}</span><strong>{data.label}</strong></div> : (
        <button type="button" aria-label={data.kind === 'paper' ? `Read ${data.label}` : `Explore ${data.label}, ${data.count} papers`}
          aria-pressed={data.active} title={data.kind === 'paper' ? data.label : data.description}
          onClick={data.onActivate} onFocus={() => data.onPreview?.(true)} onBlur={() => data.onPreview?.(false)}
          onMouseEnter={() => data.onPreview?.(true)} onMouseLeave={() => data.onPreview?.(false)}>
          {data.kind === 'foundation' && <span className="research-orb"><Icon size={27} /><span className="research-orbit" /></span>}
          {data.kind === 'paper' && <div className="research-paper-image">{data.paper?.thumb ? <img src={data.paper.thumb} alt="" draggable={false} /> : <FiFileText size={32} />}</div>}
          <span className="research-node-title">{data.label}</span>
          <span className="research-node-caption">{data.kind === 'paper' ? data.description : data.empty ? 'No papers yet' : `${data.count} ${data.count === 1 ? 'paper' : 'papers'}`}</span>
          {data.kind === 'domain' && <FiArrowUpRight className="research-node-arrow" size={14} />}
        </button>
      )}
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  )
}
const nodeTypes = { research: ResearchGraphNode }

export default function ResearchCanvas({ graph, activePaper, onSelect, onPaper }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState<ResearchNode>(graph.nodes)
  const [flow, setFlow] = useState<ReactFlowInstance<ResearchNode> | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  useEffect(() => {
    setNodes(graph.nodes)
    setHovered(null)
  }, [graph, setNodes])
  // Resize/layout work is deferred one frame so newly expanded nodes are mounted.
  useEffect(() => {
    if (!flow) return
    const frame = requestAnimationFrame(() => { void flow.fitView({ padding: 0.14, maxZoom: 1, duration: 0 }) })
    return () => cancelAnimationFrame(frame)
  }, [flow, graph])

  const highlighted = hovered ?? activePaper
  const neighborhood = useMemo(() => graphNeighborhood(highlighted, graph.edges), [highlighted, graph.edges])
  const decoratedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      active: node.id === highlighted,
      dimmed: Boolean(highlighted) && !neighborhood.nodes.has(node.id),
      onActivate: () => node.data.paper ? onPaper(node.data.paper) : node.data.selection && onSelect(node.data.selection),
      onPreview: (active: boolean) => setHovered(active ? node.id : null),
    },
  }))
  const edges = graph.edges.map((edge) => ({
    ...edge,
    className: highlighted && neighborhood.links.has(edge.id) ? 'research-edge-active' : undefined,
    style: { ...edge.style, opacity: highlighted ? neighborhood.links.has(edge.id) ? 0.9 : 0.08 : 0.35,
      strokeWidth: highlighted && neighborhood.links.has(edge.id) ? 2.5 : 1.5 },
  }))
  return (
    <ReactFlow<ResearchNode> nodes={decoratedNodes} edges={edges} onNodesChange={onNodesChange}
      onInit={setFlow} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.14, maxZoom: 1 }}
      minZoom={0.1} maxZoom={1.8} nodesConnectable={false} nodesFocusable={false} edgesFocusable={false}
      elementsSelectable={false} deleteKeyCode={null} zoomOnScroll={false} panOnScroll={false}
      preventScrolling={false} zoomOnDoubleClick={false}
      aria-label="Interactive research map. Drag nodes or the background; use zoom controls to explore.">
      <Background color="#c9d3dd" gap={24} size={1} />
      <Controls position="bottom-right" showInteractive={false} fitViewOptions={{ padding: 0.14, maxZoom: 1 }} />
    </ReactFlow>
  )
}
