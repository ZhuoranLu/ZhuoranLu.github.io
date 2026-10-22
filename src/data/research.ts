import type { Publication } from '@/types'

export const RESEARCH_FOUNDATIONS = [
  { id: 'human', label: 'Human', description: 'Behavior, judgment, trust & reliance', color: '#B98686' },
  { id: 'ai', label: 'AI', description: 'Capabilities, behavior & reliability', color: '#6F88A6' },
  { id: 'interaction', label: 'Interaction', description: 'Collaboration, assistance & interface design', color: '#6F9683' },
] as const

// Application areas plus the cross-domain Decision Making research theme.
export const RESEARCH_DOMAINS = [
  { id: 'creative-work', label: 'Creative Work', description: 'Writing, storytelling & visual creation' },
  { id: 'social-media', label: 'Media & Communication', description: 'Information spread, reviews, online communication & media bias' },
  { id: 'health', label: 'Health', description: 'Care, health data & privacy' },
  { id: 'education', label: 'Education', description: 'Learning & teaching' },
  { id: 'finance-law', label: 'Finance & Law', description: 'Financial decisions, sustainability disclosures & legal risk assessment' },
  { id: 'urban-science', label: 'Urban Science', description: 'Aviation, travel & mobility' },
  { id: 'decision-making', label: 'Decision Making', description: 'Human–AI judgment, trust, reliance & decision support' },
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
// Domains include the paper's subject and concrete tasks/datasets actually evaluated.
// Introductory examples or potential applications alone do not establish membership.
// A domain tag does not imply deployment or validation with domain professionals.
export const RESEARCH_PLACEMENTS: Record<string, ResearchPlacement> = {
  'pub-single-user-assistants-others': { foundations: ['human', 'interaction'], domains: [] },
  'pub-autoredtrader': { foundations: ['ai'], domains: ['finance-law'] },
  // AI-assisted writing and authorship evaluation: https://arxiv.org/abs/2610.19767
  'pub-likelihood-not-authorship': { foundations: ['ai', 'interaction'], domains: ['creative-work'] },
  'pub-skillvetbench': { foundations: ['ai'], domains: [] },
  'pub-tracing-genai-art': { foundations: ['human', 'interaction'], domains: ['creative-work'] },
  'pub-digital-privacy-end-of-life-care': { foundations: ['human'], domains: ['health'] },
  'pub-interpret-agent-behavior': { foundations: ['ai'], domains: [] },
  'pub-fanverse': { foundations: ['interaction'], domains: ['creative-work'] },
  'pub-grounded-theory-agent-behavior': { foundations: ['ai'], domains: [] },
  'pub-greenaudit-bench': { foundations: ['ai'], domains: ['finance-law'] },
  'pub-ubiquitous-health-data-end-of-life': { foundations: ['human', 'interaction'], domains: ['health'] },
  'pub-diabetes-computing-systems-disappear': { foundations: ['human', 'interaction'], domains: ['health'] },
  'pub-personalized-agents-judgment': { foundations: ['human', 'interaction'], domains: ['decision-making'] },
  'pub-bayesian-cascade-credibility': { foundations: ['human', 'interaction'], domains: ['social-media'] },
  'pub-adaptive-ai-assistance-bandits': { foundations: ['ai', 'interaction'], domains: ['decision-making'] },
  'pub-xagen': { foundations: ['ai', 'interaction'], domains: [] },
  'pub-llm-adversarial-risks-interventions': { foundations: ['human', 'ai', 'interaction'], domains: ['social-media'] },
  // Sec. 4.5 and Table C.1: aviation user study; loan, medical and travel benchmarks. https://arxiv.org/html/2601.21060v1
  'pub-human-llm-feature-engineering': { foundations: ['ai', 'interaction'], domains: ['health', 'finance-law', 'urban-science'] },
  // Sec. 3.1: income and recidivism prediction. https://arxiv.org/html/2502.11919v1
  'pub-from-text-to-trust': { foundations: ['interaction'], domains: ['finance-law', 'decision-making'] },
  'pub-credibility-peers-experts': { foundations: ['human', 'interaction'], domains: ['social-media'] },
  'pub-whatelse': { foundations: ['interaction'], domains: ['creative-work'] },
  'pub-llm-adversarial-lbw': { foundations: ['human', 'ai', 'interaction'], domains: ['social-media'] },
  // Sec. 3.1: sentiment judgments on IMDb movie reviews. https://mingyin.org/paper/CSCW-24/second.pdf
  'pub-does-more-advice-help': { foundations: ['human', 'interaction'], domains: ['social-media', 'decision-making'] },
  // Personalized writing evaluated on workplace communications and Reddit. https://aclanthology.org/2024.customnlp4u-1.16/
  'pub-pearl': { foundations: ['ai', 'interaction'], domains: ['creative-work', 'social-media'] },
  // Evaluation datasets: diabetes, loan default and income prediction. https://mingyin.org/paper/HCOMP-24/mm.pdf
  'pub-mix-and-match': { foundations: ['human'], domains: ['health', 'finance-law', 'decision-making'] },
  'pub-behavior-aware-ai': { foundations: ['human', 'ai', 'interaction'], domains: ['decision-making'] },
  'pub-ai-pilot-cockpit': { foundations: ['human'], domains: ['urban-science'] },
  // Sec. 3: group recidivism risk assessment. https://mingyin.org/paper/IUI-24/devil.pdf
  'pub-devils-advocate': { foundations: ['interaction'], domains: ['finance-law', 'decision-making'] },
  // Human-subject experiment: diabetes prediction. https://arxiv.org/html/2401.05840v1
  'pub-decoding-ai-nudge': { foundations: ['human'], domains: ['health', 'decision-making'] },
  // Evaluation includes news classification, spam and online toxicity detection. https://aclanthology.org/2023.emnlp-main.647/
  'pub-synthetic-data-generation': { foundations: ['ai'], domains: ['social-media'] },
  'pub-strategic-adversarial-attacks': { foundations: ['human', 'ai', 'interaction'], domains: ['decision-making'] },
  // Human-AI collaborative recidivism risk assessment. https://mingyin.org/paper/CHI-23/group-camera.pdf
  'pub-two-heads': { foundations: ['human', 'interaction'], domains: ['finance-law', 'decision-making'] },
  // Human-subject experiment: UCI income prediction. https://mingyin.org/paper/AAAI-23/TrustModel.pdf
  'pub-modeling-human-trust': { foundations: ['human'], domains: ['finance-law', 'decision-making'] },
  'pub-credibility-indicators-detection': { foundations: ['human', 'interaction'], domains: ['social-media'] },
  // Evaluated on Wikipedia edits and news articles (WIKI-Bias, BABE, MBIC). https://mingyin.org/paper/AIES-22/cleare.pdf
  'pub-biased-language': { foundations: ['ai'], domains: ['social-media'] },
  // Sec. 5.1: loan default risk assessment. https://mingyin.org/paper/WWW-22/WWW_HAI_model.pdf
  'pub-will-you-accept': { foundations: ['human'], domains: ['finance-law', 'decision-making'] },
  // General decision-making research; no separate Relationships application area. https://mingyin.org/paper/CHI-21/reliance.pdf
  'pub-human-reliance-ml': { foundations: ['human'], domains: ['decision-making'] },
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
