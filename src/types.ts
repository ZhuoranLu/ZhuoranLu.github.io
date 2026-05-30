export type VenueGroup = 'hci' | 'ai' | 'preprint' | 'other'
export type Focus = 'cognition' | 'social'
export type Goal = 'understanding' | 'designing'

export interface PubLink {
  label: string // e.g. "PDF"
  url: string
}

export interface Publication {
  id: string
  title: string
  /** Optional link applied to the title itself. */
  url?: string
  /** Author string preserving markers: **bold**, \* (equal contribution), \# (senior author). */
  authors: string
  /** Badge text, e.g. "CHI", "arXiv", "CHI-LBW". Empty string => no badge. */
  venue: string
  venueGroup: VenueGroup
  /** Full venue line, e.g. "The 44th ACM CHI, Barcelona, May 2026." */
  venueFull: string
  /** Optional secondary line, e.g. "Preliminary version in ...". */
  prelim?: string
  year: number
  /** A paper may belong to multiple categories — single value or array. */
  focus: Focus | Focus[]
  goal: Goal | Goal[]
  /** e.g. "Best Paper Award", "Oral Presentation". */
  award?: string
  links: PubLink[]
}

export interface NewsItem {
  id: string
  date: string
  /** Inline content; may contain markdown-style links. */
  text: string
}

export interface Experience {
  id: string
  dates: string
  org: string
  orgUrl: string
  location: string
  /** Detail line; may contain a markdown-style link. */
  detail: string
}

export interface ServiceGroup {
  id: string
  heading: string
  items: string[]
}

export interface ProfileLink {
  label: string
  url: string
  icon: 'email' | 'scholar' | 'cv' | 'linkedin' | 'github'
}

export interface Profile {
  name: string
  title: string
  bio: string
  location: string
  email: string
  avatar: string
  cvUrl: string
  scholarUrl: string
}

export type FilterType = 'venue' | 'focus' | 'goal'

export interface FilterOption<T extends string> {
  value: T | 'all'
  label: string
}
