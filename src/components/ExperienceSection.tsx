import { Section } from './Section'
import { renderInline } from '@/lib/inline'
import { experiences } from '@/data/experiences'

export function ExperienceSection() {
  return (
    <Section id="industry-experiences" title="Professional Experience">
      <ul className="space-y-5">
        {experiences.map((exp) => (
          <li key={exp.id}>
            <div className="leading-relaxed">
              <span className="font-medium text-brand-subtle">{exp.dates}</span>,{' '}
              <a
                href={exp.orgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-primary hover:underline"
              >
                {exp.org}
              </a>
              {exp.location && `, ${exp.location}`}.
            </div>
            <ul className="mt-1 list-disc pl-5 text-sm text-brand-muted marker:text-brand-subtle">
              <li>{renderInline(exp.detail)}</li>
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
