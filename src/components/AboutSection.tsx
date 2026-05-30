import { Section } from './Section'
import { renderInline } from '@/lib/inline'
import {
  aboutParagraphs,
  researchIntro,
  researchBullets,
  researchOutro,
} from '@/data/profile'

export function AboutSection() {
  return (
    <Section id="about-me" title="About Me">
      <div className="space-y-4 leading-relaxed">
        {aboutParagraphs.map((p, i) => (
          <p key={i}>{renderInline(p)}</p>
        ))}

        <h3 className="pt-3 text-lg font-semibold text-brand-heading">Research Interests</h3>
        {researchIntro.map((p, i) => (
          <p key={i}>{renderInline(p)}</p>
        ))}
        <ul className="list-disc space-y-1.5 pl-5 marker:text-brand-subtle">
          {researchBullets.map((b, i) => (
            <li key={i}>{renderInline(b)}</li>
          ))}
        </ul>
        <p>{renderInline(researchOutro)}</p>
      </div>
    </Section>
  )
}
