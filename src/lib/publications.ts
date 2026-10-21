import { VENUES } from '@/data/venues'
import type { Publication, PublicationFilters } from '@/types'

/** Match all active filters while preserving the editorial order. */
export function filterPublications(
  publications: readonly Publication[],
  { venue, focus, goal }: PublicationFilters,
): Publication[] {
  return publications.filter(
    (paper) =>
      (venue === 'all' || VENUES[paper.venue].group === venue) &&
      (focus === 'all' || paper.focus.includes(focus)) &&
      (goal === 'all' || paper.goal.includes(goal)),
  )
}
