import type { VenueGroup, Focus, Goal, FilterOption } from '@/types'

/** Maps a venue badge label to its filter group. */
export const VENUE_MAP: Record<string, VenueGroup> = {
  CHI: 'hci',
  'CHI-LBW': 'hci',
  CSCW: 'hci',
  IUI: 'hci',
  IJHCI: 'hci',
  HCOMP: 'hci',
  AAAI: 'ai',
  IJCAI: 'ai',
  ICLR: 'ai',
  EMNLP: 'ai',
  AIES: 'ai',
  WWW: 'ai',
  arXiv: 'preprint',
}

/** Exact badge background colors carried over from the Jekyll site. */
export const VENUE_COLORS: Record<string, string> = {
  arXiv: '#C0C0C0',
  CHI: '#E8A4A4',
  'CHI-LBW': '#E8A4A4',
  IUI: '#E8A4A4',
  ICLR: '#6E9BD0',
  CSCW: '#D97373',
  HCOMP: '#7FA9D9',
  AAAI: '#7FA9D9',
  IJCAI: '#5B8AC4',
  IJHCI: '#EBA89A',
  EMNLP: '#A5C0DE',
  AIES: '#A5C0DE',
  WWW: '#A5C0DE',
}

export const VENUE_OPTIONS: FilterOption<VenueGroup>[] = [
  { value: 'all', label: 'All' },
  { value: 'hci', label: 'HCI' },
  { value: 'ai', label: 'AI / ML' },
  { value: 'preprint', label: 'Preprint' },
]

export const FOCUS_QUESTION = 'What shapes human–AI collaboration?'
export const FOCUS_OPTIONS: FilterOption<Focus>[] = [
  { value: 'all', label: 'All' },
  { value: 'cognition', label: 'Individual Cognition' },
  { value: 'social', label: 'Social Influence' },
]

export const GOAL_QUESTION = 'How do we enhance human–AI collaboration?'
export const GOAL_OPTIONS: FilterOption<Goal>[] = [
  { value: 'all', label: 'All' },
  { value: 'understanding', label: 'Understanding Human-AI Interaction' },
  { value: 'designing', label: 'Designing Human-centered AI' },
]
