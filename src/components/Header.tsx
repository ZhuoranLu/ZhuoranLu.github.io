import { useState } from 'react'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { navItems } from '@/data/nav'
import { profile } from '@/data/profile'

export function Header() {
  const [open, setOpen] = useState(false)

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-lg font-bold text-brand-heading"
        >
          {profile.name}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="text-xl text-brand-heading md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col border-t border-brand-border bg-brand-bg px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="py-2 text-left text-sm font-medium text-brand-text hover:text-brand-primary"
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
