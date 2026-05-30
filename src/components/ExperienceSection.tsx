import { Section } from './Section'
import { renderInline } from '@/lib/inline'
import { experiences } from '@/data/experiences'

export function ExperienceSection() {
  return (
    <Section id="industry-experiences" title="Industry Experiences">
      <ul className="space-y-4">
        {experiences.map((exp) => (
          <li key={exp.id}>
            <div className="leading-relaxed">
              <span className="italic text-brand-text/70">{exp.dates}</span>,{' '}
              <a
                href={exp.orgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-primary hover:underline"
              >
                {exp.org}
              </a>
              , {exp.location}.
            </div>
            <ul className="list-disc pl-6 text-sm text-brand-text/90">
              <li>{renderInline(exp.detail)}</li>
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
