import { useEffect, useId, useRef, useState } from 'react'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { navItems } from '@/data/nav'
import { profile } from '@/data/profile'

function NavLinks({ onSelect, mobile = false }: {
  onSelect: (id: string) => void
  mobile?: boolean
}) {
  return navItems.map((item) => (
    <button
      key={item.id}
      type="button"
      onClick={() => onSelect(item.id)}
      className={`text-sm font-medium text-brand-muted transition-colors hover:text-brand-primary ${
        mobile ? 'py-2.5 text-left' : ''
      }`}
    >
      {item.label}
    </button>
  ))
}

export function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // Measure after the mobile menu closes so the sticky header has its final height.
    requestAnimationFrame(() => {
      const target = document.getElementById(id)
      target?.focus({ preventScroll: true })
      target?.scrollIntoView()
    })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <button
          type="button"
          onClick={() => {
            setOpen(false)
            window.scrollTo({ top: 0 })
          }}
          className="text-base font-semibold tracking-tight text-brand-heading"
        >
          {profile.name}
        </button>

        <nav aria-label="Main navigation" className="hidden md:flex md:gap-7">
          <NavLinks onSelect={go} />
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="text-xl text-brand-heading md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={menuId}
        >
          {open ? <FaXmark aria-hidden /> : <FaBars aria-hidden />}
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Mobile navigation"
        hidden={!open}
        className={`${open ? 'flex' : 'hidden'} flex-col border-t border-brand-border bg-brand-bg px-4 py-2 md:hidden`}
      >
        <NavLinks onSelect={go} mobile />
      </nav>
    </header>
  )
}
