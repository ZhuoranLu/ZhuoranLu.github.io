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
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Sidebar />
          </div>
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
