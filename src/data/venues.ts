import type { VenueGroup } from '@/types'

interface VenueDefinition {
  group: VenueGroup
  color: string
}

/** Single source for venue filter groups and badge colors. */
export const VENUES = {
  'IEEE S&P': { group: 'hci', color: '#C98296' },
  'CHI': { group: 'hci', color: '#E8A4A4' },
  'CHI-LBW': { group: 'hci', color: '#E8A4A4' },
  'CSCW': { group: 'hci', color: '#D97373' },
  'IUI': { group: 'hci', color: '#E8A4A4' },
  'IJHCI': { group: 'hci', color: '#EBA89A' },
  'IMWUT': { group: 'hci', color: '#D995AD' },
  'DAAI': { group: 'hci', color: '#EBA89A' },
  'HCOMP': { group: 'ai', color: '#7FA9D9' },
  'AAAI': { group: 'ai', color: '#7FA9D9' },
  'IJCAI': { group: 'ai', color: '#5B8AC4' },
  'ICLR': { group: 'ai', color: '#6E9BD0' },
  'NeurIPS': { group: 'ai', color: '#6E9BD0' },
  'EMNLP': { group: 'ai', color: '#A5C0DE' },
  'AIES': { group: 'ai', color: '#A5C0DE' },
  'WWW': { group: 'ai', color: '#A5C0DE' },
  'arXiv': { group: 'preprint', color: '#C0C0C0' },
  'CustomNLP4U @ EMNLP': { group: 'workshop', color: '#CBDCEE' },
  'FinNLP @ EMNLP': { group: 'workshop', color: '#CBDCEE' },
  'UbiComp Companion': { group: 'workshop', color: '#F3D3D3' },
  'NeurIPS Creative AI': { group: 'workshop', color: '#CBDCEE' },
} as const satisfies Record<string, VenueDefinition>

export type Venue = keyof typeof VENUES
