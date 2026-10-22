// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PublicationsSection } from './PublicationsSection'
import { publications } from '@/data/publications'
import type { Publication } from '@/types'
import { selectResearchPapers, type ResearchSelection } from '@/data/research'

vi.mock('./ResearchCanvas', () => ({ default: () => null }))
vi.mock('./ResearchMap', () => ({ ResearchMap: ({ visible, showPapers, onSelectionChange }: {
  visible: readonly Publication[]
  showPapers: boolean
  onSelectionChange: (selection: ResearchSelection) => void
}) => <div data-map data-show-papers={showPapers}>
  <button onClick={() => onSelectionChange({ foundation: 'human', domain: null })}>Explore Human</button>
  {visible.map((paper) => <div key={paper.id} data-publication-id={paper.id} />)}
</div> }))
let root: Root
let host: HTMLDivElement
let reduced = false
beforeEach(async () => {
  vi.useFakeTimers()
  reduced = false
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  vi.stubGlobal('matchMedia', () => ({ matches: reduced }))
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => window.setTimeout(() => callback(0), 16))
  vi.stubGlobal('cancelAnimationFrame', (id: number) => window.clearTimeout(id))
  host = document.createElement('div')
  document.body.append(host)
  root = createRoot(host)
  await act(async () => root.render(<PublicationsSection publications={publications} id="papers" title="Papers" />))
})
afterEach(async () => {
  await act(async () => root.unmount())
  host.remove()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})
async function click(label: string) {
  const button = [...host.querySelectorAll('button')].find((button) => button.textContent === label)!
  await act(async () => button.click())
}
async function settle() { await act(async () => { await vi.advanceTimersByTimeAsync(200) }) }
const isBusy = () => host.querySelector('.publication-view')?.getAttribute('aria-busy') === 'true'

describe('publication view transitions', () => {
  it('fades the old view before switching and makes the new view interactive', async () => {
    await click('Research Map')
    expect(isBusy()).toBe(true)
    expect(host.querySelector('article')).not.toBeNull()
    expect(host.querySelector('[data-map]')).toBeNull()
    await settle()
    expect(isBusy()).toBe(false)
    expect(host.querySelector('[data-map]')).not.toBeNull()
    await click('List')
    await settle()
    expect(host.querySelectorAll('article')).toHaveLength(publications.length)
    expect(isBusy()).toBe(false)
  })

  it('honors the last click when switching rapidly in either phase', async () => {
    await click('Research Map')
    await click('List')
    await settle()
    expect(host.querySelector('[data-map]')).toBeNull()
    await click('Research Map')
    await act(async () => { await vi.advanceTimersByTimeAsync(125) })
    await click('List')
    await click('Research Map')
    await settle()
    expect(host.querySelector('[data-map]')).not.toBeNull()
    expect(isBusy()).toBe(false)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('switches immediately when reduced motion is preferred', async () => {
    reduced = true
    await click('Research Map')
    expect(host.querySelector('[data-map]')).not.toBeNull()
    expect(isBusy()).toBe(false)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('shares the same ordered papers and filters when moving between views', async () => {
    const ids = () => [...host.querySelectorAll('[data-publication-id]')].map((card) => card.getAttribute('data-publication-id'))
    await click('Research Map')
    await settle()
    await click('Explore Human')
    const expected = selectResearchPapers(publications, { foundation: 'human', domain: null }).map((paper) => paper.id)
    expect(ids()).toEqual(expected)
    const foundation = host.querySelector<HTMLSelectElement>('[aria-label="Research foundation"]')!
    expect(foundation.value).toBe('human')
    const venueFilter = [...host.querySelectorAll('[role="group"]')].find((group) => group.textContent?.startsWith('Venue'))
    await click('List')
    await settle()
    expect(ids()).toEqual(expected)
    expect(host.contains(venueFilter!)).toBe(true)
    expect(venueFilter?.closest('details')).toBeNull()
    expect(host.querySelector('.publication-toolbar')).toBeNull()
    await click('HCI')
    const venueFiltered = ids()
    expect(venueFiltered.length).toBeGreaterThan(0)
    expect(venueFiltered.length).toBeLessThan(expected.length)
    await click('Research Map')
    await settle()
    expect(ids()).toEqual(venueFiltered)
    const domain = host.querySelector<HTMLSelectElement>('[aria-label="Application domain"]')!
    await act(async () => { domain.value = 'education'; domain.dispatchEvent(new Event('change', { bubbles: true })) })
    expect(ids()).toEqual([])
    await click('Research Map')
    await settle()
    expect(ids()).toEqual([])
    await click('Clear filters')
    expect(ids()).toEqual(publications.map((paper) => paper.id))
    expect(host.querySelector<HTMLSelectElement>('[aria-label="Research foundation"]')!.value).toBe('')
    expect(domain.value).toBe('')
  })

  it('searches displayed venue names and opens matching papers directly in Map', async () => {
    await click('Research Map')
    await settle()
    const search = host.querySelector<HTMLInputElement>('[aria-label="Search publications"]')!
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(search, 'arXiv')
      search.dispatchEvent(new Event('input', { bubbles: true }))
    })
    const expected = publications.filter((paper) => paper.venue === 'arXiv').map((paper) => paper.id)
    expect([...host.querySelectorAll('[data-publication-id]')].map((card) => card.getAttribute('data-publication-id'))).toEqual(expected)
    expect(host.querySelector('[data-map]')?.getAttribute('data-show-papers')).toBe('true')
    await click('List')
    await settle()
    expect([...host.querySelectorAll('[data-publication-id]')].map((card) => card.getAttribute('data-publication-id'))).toEqual(expected)
    expect(host.textContent).toContain('Search: arXiv')
    await click('Research Map')
    await settle()
    await click('Clear filters')
    expect(host.querySelector<HTMLInputElement>('[aria-label="Search publications"]')!.value).toBe('')
    expect(host.querySelector('[data-map]')?.getAttribute('data-show-papers')).toBe('false')
  })
})
