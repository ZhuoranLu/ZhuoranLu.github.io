import { Layout } from '@/components/Layout'
import { AboutSection } from '@/components/AboutSection'
import { NewsSection } from '@/components/NewsSection'
import { PublicationsSection } from '@/components/PublicationsSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { ServiceSection } from '@/components/ServiceSection'

export function Home() {
  return (
    <Layout>
      <AboutSection />
      <NewsSection />
      <PublicationsSection />
      <ExperienceSection />
      <ServiceSection />
    </Layout>
  )
}
