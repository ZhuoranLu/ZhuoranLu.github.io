import type { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-brand-page text-brand-text">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
          <div className="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-border">
              <Sidebar />
            </div>
          </div>
          <main className="rounded-2xl bg-white px-6 py-2 shadow-sm ring-1 ring-brand-border lg:px-10">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
