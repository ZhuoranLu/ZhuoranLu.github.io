import { FaEnvelope, FaFilePdf } from 'react-icons/fa6'
import { SiGooglescholar } from 'react-icons/si'
import { profile } from '@/data/profile'

export function Sidebar() {
  return (
    <aside className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="h-40 w-40 rounded-full object-cover lg:h-48 lg:w-48"
      />
      <h1 className="mt-4 text-xl font-bold text-brand-heading">{profile.name}</h1>
      <p className="mt-1 text-sm text-brand-text/80">{profile.bio}</p>
      <p className="mt-1 text-sm text-brand-text/70">{profile.location}</p>

      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 text-brand-text hover:text-brand-primary"
          >
            <FaEnvelope className="shrink-0" aria-hidden />
            {profile.email}
          </a>
        </li>
        <li>
          <a
            href={profile.scholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-text hover:text-brand-primary"
          >
            <SiGooglescholar className="shrink-0" aria-hidden />
            Google Scholar
          </a>
        </li>
        <li>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-text hover:text-brand-primary"
          >
            <FaFilePdf className="shrink-0" aria-hidden />
            Curriculum Vitae
          </a>
        </li>
      </ul>
    </aside>
  )
}
