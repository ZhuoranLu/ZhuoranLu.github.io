import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl border-t border-brand-border px-4 py-6 text-center text-xs text-brand-subtle lg:px-8">
      © {profile.name}. Built with React, Vite &amp; Tailwind CSS.
    </footer>
  )
}
