import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Home } from '@/pages/Home'
import { publications } from './publications'
import { publicationAbstracts } from './publicationAbstracts'
import { profile } from './profile'
import { news } from './news'
import { experiences } from './experiences'
import { service } from './service'
import { navItems } from './nav'
import { VENUES } from './venues'
import { FOCUS_OPTIONS, GOAL_OPTIONS, VENUE_OPTIONS } from './filters'

const home = renderToStaticMarkup(<Home />)
const attributes = (html: string, name: string) =>
  [...html.matchAll(new RegExp(`\\b${name}="([^"]+)"`, 'g'))].map((match) => match[1])

function expectUnique(values: string[]) {
  expect(new Set(values).size).toBe(values.length)
  for (const value of values) expect(value.trim()).not.toBe('')
}

describe('site content integrity', () => {
  it('attaches sourced plain-text abstracts only to existing papers', () => {
    const ids = new Set(publications.map((paper) => paper.id))
    for (const [id, abstract] of Object.entries(publicationAbstracts)) {
      expect(ids.has(id), id).toBe(true)
      expect(abstract?.text.trim().length, id).toBeGreaterThan(100)
      expect(abstract?.text, id).not.toMatch(/[\uFFFD\uFFFF\u0000-\u0008]|<\/?(?:p|div|script|jats:)[\s>]/)
      expect(new URL(abstract!.source).protocol, id).toBe('https:')
    }
  })
  it('uses unique nonempty IDs in each content collection and the rendered page', () => {
    for (const collection of [publications, news, experiences, service, navItems]) {
      expectUnique(collection.map((item) => item.id))
    }
    expectUnique(attributes(home, 'id'))
  })

  it('connects every navigation item to a focusable page section', () => {
    const sections = [...home.matchAll(/<section\b[^>]*>/g)].map(([tag]) => tag)
    for (const item of navItems) {
      const section = sections.find((tag) => attributes(tag, 'id').includes(item.id))
      expect(section, `Missing section: ${item.id}`).toBeDefined()
      expect(section).toContain('tabindex="-1"')
    }
  })

  it('uses registered venues, nonempty tag arrays, and valid optional links', () => {
    const focusValues = FOCUS_OPTIONS.filter((option) => option.value !== 'all').map((option) => option.value)
    const goalValues = GOAL_OPTIONS.filter((option) => option.value !== 'all').map((option) => option.value)
    const venueGroups = VENUE_OPTIONS.filter((option) => option.value !== 'all').map((option) => option.value)
    for (const paper of publications) {
      expect(VENUES, paper.id).toHaveProperty(paper.venue)
      expect(venueGroups, paper.id).toContain(VENUES[paper.venue].group)
      expect(Array.isArray(paper.focus) && paper.focus.length > 0, paper.id).toBe(true)
      expect(Array.isArray(paper.goal) && paper.goal.length > 0, paper.id).toBe(true)
      for (const focus of paper.focus) expect(focusValues, paper.id).toContain(focus)
      for (const goal of paper.goal) expect(goalValues, paper.id).toContain(goal)
      if (paper.url !== undefined) expect(new URL(paper.url).protocol, paper.id).toMatch(/^https?:$/)
    }
  })

  it('keeps all rendered local resources, thumbnails, CV and manifest icons available', () => {
    const index = readFileSync(resolve('index.html'), 'utf8')
    const manifest = JSON.parse(readFileSync(resolve('public/site.webmanifest'), 'utf8')) as { icons: { src: string }[] }
    const urls = [
      ...attributes(home, 'src'), ...attributes(home, 'href'),
      ...attributes(index, 'href'),
      ...publications.flatMap((paper) => paper.thumb ? [paper.thumb] : []),
      profile.avatar, profile.cvUrl,
      ...manifest.icons.map((icon) => icon.src),
    ]
    for (const url of new Set(urls.filter((url) => url.startsWith('/') && !url.startsWith('//')))) {
      const pathname = decodeURIComponent(new URL(url, 'https://example.com').pathname)
      expect(statSync(resolve('public', `.${pathname}`)).isFile(), `Missing public resource: ${url}`).toBe(true)
    }
  })
})
