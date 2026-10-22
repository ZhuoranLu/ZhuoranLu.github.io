// @vitest-environment jsdom
import { act, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ResearchMap } from './ResearchMap'
import { publications } from '@/data/publications'
import { selectResearchPapers, type ResearchSelection } from '@/data/research'
import type { buildResearchGraph } from '@/lib/researchGraph'
import type { Publication } from '@/types'

// The graph engine's pointer/zoom behavior is checked in the browser. Here the
// renderer is a boundary stub so these tests exercise selection/focus lifecycles.
vi.mock('./ResearchCanvas', () => ({ default: ({ graph, onPaper, onSelect }: {
  graph: ReturnType<typeof buildResearchGraph>
  onPaper: (paper: Publication) => void
  onSelect: (selection: ResearchSelection) => void
}) => <div>{graph.expanded
  ? graph.nodes.filter((node) => node.data.paper).map((node) => <button key={node.id} data-paper={node.id} onClick={() => onPaper(node.data.paper!)}>{node.data.label}</button>)
  : <button data-topic="human" onClick={() => onSelect({ foundation: 'human', domain: null })}>Human</button>}</div> }))

const human = { foundation: 'human' as const, domain: null }
const humanPapers = selectResearchPapers(publications, human)
let host: HTMLDivElement
let root: Root
let media: { matches: boolean; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn> }
let mediaChange: () => void
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  media = { matches: false, addEventListener: vi.fn((_, listener) => { mediaChange = listener }), removeEventListener: vi.fn() }
  vi.stubGlobal('matchMedia', () => media)
  HTMLElement.prototype.scrollIntoView = vi.fn()
  host = document.createElement('div')
  document.body.append(host)
  root = createRoot(host)
})
afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.unstubAllGlobals() })
async function render(visible: Publication[]) {
  await act(async () => root.render(<ResearchMap publications={publications} visible={visible} selection={human} onSelectionChange={() => {}} />))
}
async function openPaper(id: string) {
  const button = host.querySelector<HTMLButtonElement>(`[data-paper="${id}"]`)!
  await act(async () => { button.focus(); button.click() })
}

describe('research map selection lifecycle', () => {
  it('shows filtered papers without requiring an additional topic selection', async () => {
    const results = publications.filter((paper) => paper.title.toLowerCase().includes('fanverse'))
    expect(results.length).toBeGreaterThan(0)
    await act(async () => root.render(<ResearchMap publications={publications} visible={results}
      selection={{ foundation: null, domain: null }} showPapers onSelectionChange={() => {}} />))
    expect([...host.querySelectorAll('[data-paper]')].map((node) => node.getAttribute('data-paper'))).toEqual(results.map((paper) => paper.id))
    await openPaper(results[0].id)
    expect(host.querySelector('aside')?.textContent).toContain(results[0].title)
  })

  it('does not reopen a dismissed-by-filter paper when the filter is cleared', async () => {
    await render(publications)
    await openPaper(humanPapers[0].id)
    expect(host.querySelector('aside')).not.toBeNull()
    expect(document.activeElement?.textContent).toBe('Close')
    await render(publications.filter((paper) => paper.id !== humanPapers[0].id))
    expect(host.querySelector('aside')).toBeNull()
    await render(publications)
    expect(host.querySelector('aside')).toBeNull()
  })

  it('closes paper details and restores valid focus when shared filters return to overview', async () => {
    await render(publications)
    await openPaper(humanPapers[0].id)
    await act(async () => root.render(<ResearchMap publications={publications} visible={publications}
      selection={{ foundation: null, domain: null }} onSelectionChange={() => {}} />))
    expect(host.querySelector('aside')).toBeNull()
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Research map')
    await render(publications)
    expect(host.querySelector('aside')).toBeNull()
  })

  it('keeps all papers and the selected details available across responsive layout changes', async () => {
    await render(publications)
    await openPaper(humanPapers[2].id)
    expect(host.querySelector('aside')).not.toBeNull()
    await act(async () => { media.matches = true; mediaChange() })
    expect(host.querySelector('aside')).not.toBeNull()
    expect(host.querySelectorAll('[data-paper]')).toHaveLength(humanPapers.length)
    await act(async () => { media.matches = false; mediaChange() })
    expect(host.querySelector('aside')).not.toBeNull()
    expect(host.querySelectorAll('[data-paper]')).toHaveLength(humanPapers.length)
  })

  it('hands off focus when a topic expands and returns it when paper details close', async () => {
    function Harness() {
      const [selection, setSelection] = useState<ResearchSelection>({ foundation: null, domain: null })
      return <ResearchMap publications={publications} visible={publications} selection={selection} onSelectionChange={setSelection} />
    }
    await act(async () => root.render(<Harness />))
    await act(async () => { host.querySelector<HTMLButtonElement>('[data-topic="human"]')!.click() })
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Research map')
    await openPaper(humanPapers[0].id)
    await act(async () => { document.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })) })
    expect(host.querySelector('aside')).toBeNull()
    expect(document.activeElement?.getAttribute('data-paper')).toBe(humanPapers[0].id)
  })
})
