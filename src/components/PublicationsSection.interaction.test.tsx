// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PublicationsSection } from './PublicationsSection'
import { publications } from '@/data/publications'

vi.mock('./ResearchCanvas', () => ({ default: () => null }))
vi.mock('./ResearchMap', () => ({ ResearchMap: () => <div data-map>Research map</div> }))
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
})
