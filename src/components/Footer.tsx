import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="border-t border-brand-border py-6 text-center text-xs text-brand-text/60">
      © {profile.name}. Built with React, Vite &amp; Tailwind CSS.
    </footer>
  )
}
