import { Layout } from '@/components/Layout'
import { AboutSection } from '@/components/AboutSection'
import { NewsSection } from '@/components/NewsSection'
import { PublicationsSection } from '@/components/PublicationsSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { ServiceSection } from '@/components/ServiceSection'
import { publications } from '@/data/publications'

export function Home() {
  return (
    <Layout>
      <AboutSection />
      <NewsSection />
      <PublicationsSection
        publications={publications}
        id="publications"
        title="Selected Publications & Manuscripts"
      />
      <ExperienceSection />
      <ServiceSection />
    </Layout>
  )
}
