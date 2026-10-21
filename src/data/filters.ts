import type { VenueGroup, Focus, Goal, FilterOption } from '@/types'

export const VENUE_OPTIONS: FilterOption<VenueGroup>[] = [
  { value: 'all', label: 'All' },
  { value: 'hci', label: 'HCI' },
  { value: 'ai', label: 'AI / ML' },
  { value: 'preprint', label: 'Preprint' },
  { value: 'workshop', label: 'Workshop Papers' },
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
