import { describe, expect, it } from 'vitest'
import { filterPublications } from './publications'
import type { Publication, PublicationFilters } from '@/types'

const all: PublicationFilters = { venue: 'all', focus: 'all', goal: 'all' }
const papers: Publication[] = [
  { id: 'multi', title: 'Multiple categories', authors: 'A', venue: 'CHI', venueFull: 'CHI 2024', year: 2024, focus: ['cognition', 'social'], goal: ['understanding', 'designing'] },
  { id: 'ai', title: 'AI paper', authors: 'B', venue: 'AAAI', venueFull: 'AAAI 2026', year: 2026, focus: ['cognition'], goal: ['designing'] },
  { id: 'social', title: 'Social paper', authors: 'C', venue: 'CHI', venueFull: 'CHI 2025', year: 2025, focus: ['social'], goal: ['understanding'] },
]
const ids = (filters: PublicationFilters) => filterPublications(papers, filters).map((paper) => paper.id)

describe('publication filtering', () => {
  it('keeps every paper in editorial order without mutating the input', () => {
    const original = structuredClone(papers)
    expect(ids(all)).toEqual(['multi', 'ai', 'social'])
    expect(papers).toEqual(original)
  })

  it('matches either category on papers with multiple focus or goal tags', () => {
    expect(ids({ ...all, focus: 'social' })).toEqual(['multi', 'social'])
    expect(ids({ ...all, focus: 'cognition' })).toEqual(['multi', 'ai'])
    expect(ids({ ...all, goal: 'understanding' })).toEqual(['multi', 'social'])
    expect(ids({ ...all, goal: 'designing' })).toEqual(['multi', 'ai'])
  })

  it('intersects the venue group, focus and goal rather than combining them', () => {
    expect(ids({ venue: 'hci', focus: 'social', goal: 'designing' })).toEqual(['multi'])
    expect(ids({ venue: 'ai', focus: 'cognition', goal: 'designing' })).toEqual(['ai'])
  })

  it('returns an empty result for incompatible filters or an empty collection', () => {
    expect(ids({ venue: 'ai', focus: 'social', goal: 'understanding' })).toEqual([])
    expect(filterPublications([], all)).toEqual([])
  })
})
