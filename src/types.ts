import type { Venue } from '@/data/venues'

export type VenueGroup = 'hci' | 'ai' | 'preprint' | 'workshop' | 'other'
export type Focus = 'cognition' | 'social'
export type Goal = 'understanding' | 'designing'

export interface Publication {
  id: string
  title: string
  /** Optional link applied to the title itself. */
  url?: string
  /** Author string preserving markers: **bold**, \* (equal contribution), † (senior author). */
  authors: string
  /** Badge label; group and color are defined in the venue configuration. */
  venue: Venue
  /** Full venue line, e.g. "The 44th ACM CHI, Barcelona, May 2026." */
  venueFull: string
  /** Optional secondary line, e.g. "Preliminary version in ...". */
  prelim?: string
  year: number
  /** A paper may belong to multiple categories. */
  focus: Focus[]
  goal: Goal[]
  /** e.g. "Best Paper Award", "Oral Presentation". */
  award?: string
  /** Schematic thumbnail shown left of the entry, e.g. "/images/papers/foo.png". */
  thumb?: string
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

export interface PublicationFilters {
  venue: VenueGroup | 'all'
  focus: Focus | 'all'
  goal: Goal | 'all'
}

export interface FilterOption<T extends string> {
  value: T | 'all'
  label: string
}
