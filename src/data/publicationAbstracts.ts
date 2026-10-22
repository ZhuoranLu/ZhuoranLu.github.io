export interface PublicationAbstract {
  text: string
  /** Paper or publisher page from which the abstract was verified. */
  source: string
}

// Verified abstracts keyed by the existing publication ID. Omit unavailable text.
export const publicationAbstracts: Readonly<Partial<Record<string, PublicationAbstract>>> = abstracts
import abstracts from './publicationAbstracts.json'
