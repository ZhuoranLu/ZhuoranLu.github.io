import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { publications } from '@/data/publications'
import {
  RESEARCH_DOMAINS, RESEARCH_FOUNDATIONS, RESEARCH_PLACEMENTS, selectResearchPapers,
} from '@/data/research'
import { ResearchMap } from '@/components/ResearchMap'
import { PublicationsSection } from '@/components/PublicationsSection'

const all = { foundation: null, domain: null }

describe('research map', () => {
  it('assigns every current paper valid foundations and optional domains, without stale IDs', () => {
    expect(Object.keys(RESEARCH_PLACEMENTS).sort()).toEqual(publications.map((paper) => paper.id).sort())
    for (const placement of Object.values(RESEARCH_PLACEMENTS)) {
      expect(placement.foundations.length).toBeGreaterThan(0)
      expect(new Set(placement.foundations).size).toBe(placement.foundations.length)
      expect(new Set(placement.domains).size).toBe(placement.domains.length)
      for (const foundation of placement.foundations) expect(RESEARCH_FOUNDATIONS.map((item) => item.id)).toContain(foundation)
      for (const domain of placement.domains) expect(RESEARCH_DOMAINS.map((item) => item.id)).toContain(domain)
    }
  })

  it('supports independent dimensions and intersects multi-label membership without duplicates or reordering', () => {
    const original = structuredClone(publications)
    const papers = selectResearchPapers(publications, { foundation: 'ai', domain: 'social-media' })
    expect(papers.map((paper) => paper.id)).toEqual(['pub-llm-adversarial-risks-interventions', 'pub-llm-adversarial-lbw'])
    expect(selectResearchPapers(publications, { foundation: 'human', domain: null }).map((paper) => paper.id)).toContain('pub-modeling-human-trust')
    expect(selectResearchPapers(publications, { foundation: null, domain: 'entertainment' }).map((paper) => paper.id)).toEqual([
      'pub-tracing-genai-art', 'pub-fanverse', 'pub-whatelse',
    ])
    expect(selectResearchPapers(publications, all)).toEqual(publications)
    expect(publications).toEqual(original)
  })

  it('works on an already filtered subset and retains Education as a coming-soon domain', () => {
    expect(selectResearchPapers([publications[0]], { foundation: 'ai', domain: null })).toEqual([])
    const markup = renderToStaticMarkup(<ResearchMap publications={publications} visible={publications}
      selection={{ foundation: null, domain: 'education' }} onSelectionChange={() => {}} />)
    expect(markup).toContain('Education')
    expect(markup).toContain('Coming soon')
    expect(markup).toContain('Research in Education is coming soon.')
    expect(markup).not.toContain('<article')
    expect(selectResearchPapers([], all)).toEqual([])
  })

  it('distinguishes an empty intersection from a domain without any publications', () => {
    const markup = renderToStaticMarkup(<ResearchMap publications={publications} visible={publications}
      selection={{ foundation: 'ai', domain: 'health' }} onSelectionChange={() => {}} />)
    expect(markup).toContain('No publications match this intersection and the current filters.')
    expect(markup).not.toContain('Research in Health is coming soon.')
  })

  it('starts in list view with all papers available as before', () => {
    const markup = renderToStaticMarkup(<PublicationsSection publications={publications} id="publications" title="Publications" />)
    expect(markup).toMatch(/aria-pressed="true"[^>]*>List<\/button>/)
    expect(markup.match(/<article\b/g)).toHaveLength(publications.length)
  })
})
