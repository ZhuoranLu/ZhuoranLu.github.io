import { FaEnvelope, FaFilePdf } from 'react-icons/fa6'
import { SiGooglescholar } from 'react-icons/si'
import { profile } from '@/data/profile'

export function Sidebar() {
  return (
    <aside className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="h-36 w-36 rounded-full object-cover ring-1 ring-brand-border lg:h-44 lg:w-44"
      />
      <h1 className="mt-5 text-xl font-bold text-brand-heading">{profile.name}</h1>
      <p className="mt-1 text-sm text-brand-muted">{profile.bio}</p>
      <p className="mt-0.5 text-sm text-brand-subtle">{profile.location}</p>

      <ul className="mt-5 space-y-2.5 text-sm">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2.5 text-brand-text transition-colors hover:text-brand-primary"
          >
            <FaEnvelope className="shrink-0 text-brand-subtle" aria-hidden />
            {profile.email}
          </a>
        </li>
        <li>
          <a
            href={profile.scholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-brand-text transition-colors hover:text-brand-primary"
          >
            <SiGooglescholar className="shrink-0 text-brand-subtle" aria-hidden />
            Google Scholar
          </a>
        </li>
        <li>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-brand-text transition-colors hover:text-brand-primary"
          >
            <FaFilePdf className="shrink-0 text-brand-subtle" aria-hidden />
            Curriculum Vitae
          </a>
        </li>
      </ul>
    </aside>
  )
}
