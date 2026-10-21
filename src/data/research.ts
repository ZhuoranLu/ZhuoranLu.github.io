import type { Publication } from '@/types'

export const RESEARCH_FOUNDATIONS = [
  { id: 'human', label: 'Human', description: 'Behavior, judgment, trust & reliance', color: '#B98686' },
  { id: 'ai', label: 'AI', description: 'Capabilities, behavior & reliability', color: '#6F88A6' },
  { id: 'interaction', label: 'Interaction', description: 'Collaboration, assistance & interface design', color: '#6F9683' },
] as const

export const RESEARCH_DOMAINS = [
  { id: 'entertainment', label: 'Entertainment', description: 'Storytelling & creative practice' },
  { id: 'social-media', label: 'Social Media', description: 'Information spread & social influence' },
  { id: 'health', label: 'Health', description: 'Care, health data & privacy' },
  { id: 'education', label: 'Education', description: 'Learning & teaching' },
  { id: 'finance', label: 'Finance', description: 'Trading agents & financial information' },
  { id: 'sustainability', label: 'Sustainability', description: 'Environmental claims & disclosure' },
  { id: 'aviation', label: 'Aviation', description: 'Public acceptance of AI pilots' },
] as const

export type ResearchFoundation = typeof RESEARCH_FOUNDATIONS[number]['id']
export type ResearchDomain = typeof RESEARCH_DOMAINS[number]['id']
export interface ResearchPlacement {
  foundations: ResearchFoundation[]
  domains: ResearchDomain[]
}

// Editorial draft based on the stated subject of each paper; review with the author.
// Foundations and domains are independent, multi-valued dimensions. An empty domain
// means no specific application domain is assigned, not an incomplete record.
// An experimental task alone is not sufficient to assign an application domain.
export const RESEARCH_PLACEMENTS: Record<string, ResearchPlacement> = {
  'pub-single-user-assistants-others': { foundations: ['human', 'interaction'], domains: [] },
  'pub-autoredtrader': { foundations: ['ai'], domains: ['finance'] },
  'pub-likelihood-not-authorship': { foundations: ['ai', 'interaction'], domains: [] },
  'pub-skillvetbench': { foundations: ['ai'], domains: [] },
  'pub-tracing-genai-art': { foundations: ['human', 'interaction'], domains: ['entertainment'] },
  'pub-digital-privacy-end-of-life-care': { foundations: ['human'], domains: ['health'] },
  'pub-interpret-agent-behavior': { foundations: ['ai'], domains: [] },
  'pub-fanverse': { foundations: ['interaction'], domains: ['entertainment'] },
  'pub-grounded-theory-agent-behavior': { foundations: ['ai'], domains: [] },
  'pub-greenaudit-bench': { foundations: ['ai'], domains: ['sustainability'] },
  'pub-ubiquitous-health-data-end-of-life': { foundations: ['human', 'interaction'], domains: ['health'] },
  'pub-diabetes-computing-systems-disappear': { foundations: ['human', 'interaction'], domains: ['health'] },
  'pub-personalized-agents-judgment': { foundations: ['human', 'interaction'], domains: [] },
  'pub-bayesian-cascade-credibility': { foundations: ['human', 'interaction'], domains: ['social-media'] },
  'pub-adaptive-ai-assistance-bandits': { foundations: ['ai', 'interaction'], domains: [] },
  'pub-xagen': { foundations: ['ai', 'interaction'], domains: [] },
  'pub-llm-adversarial-risks-interventions': { foundations: ['human', 'ai', 'interaction'], domains: ['social-media'] },
  'pub-human-llm-feature-engineering': { foundations: ['ai', 'interaction'], domains: [] },
  'pub-from-text-to-trust': { foundations: ['interaction'], domains: [] },
  'pub-credibility-peers-experts': { foundations: ['human', 'interaction'], domains: ['social-media'] },
  'pub-whatelse': { foundations: ['interaction'], domains: ['entertainment'] },
  'pub-llm-adversarial-lbw': { foundations: ['human', 'ai', 'interaction'], domains: ['social-media'] },
  'pub-does-more-advice-help': { foundations: ['human', 'interaction'], domains: [] },
  'pub-pearl': { foundations: ['ai', 'interaction'], domains: [] },
  'pub-mix-and-match': { foundations: ['human'], domains: [] },
  'pub-behavior-aware-ai': { foundations: ['human', 'ai', 'interaction'], domains: [] },
  'pub-ai-pilot-cockpit': { foundations: ['human'], domains: ['aviation'] },
  'pub-devils-advocate': { foundations: ['interaction'], domains: [] },
  'pub-decoding-ai-nudge': { foundations: ['human'], domains: [] },
  'pub-synthetic-data-generation': { foundations: ['ai'], domains: [] },
  'pub-strategic-adversarial-attacks': { foundations: ['human', 'ai', 'interaction'], domains: [] },
  'pub-two-heads': { foundations: ['human', 'interaction'], domains: [] },
  'pub-modeling-human-trust': { foundations: ['human'], domains: [] },
  'pub-credibility-indicators-detection': { foundations: ['human', 'interaction'], domains: ['social-media'] },
  'pub-biased-language': { foundations: ['ai'], domains: [] },
  'pub-will-you-accept': { foundations: ['human'], domains: [] },
  'pub-human-reliance-ml': { foundations: ['human'], domains: [] },
}

export interface ResearchSelection {
  foundation: ResearchFoundation | null
  domain: ResearchDomain | null
}

export function selectResearchPapers(publications: readonly Publication[], { foundation, domain }: ResearchSelection) {
  return publications.filter((paper) => {
    const placement = RESEARCH_PLACEMENTS[paper.id]
    return (!foundation || placement?.foundations.includes(foundation))
      && (!domain || placement?.domains.includes(domain))
  })
}
