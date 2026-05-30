import { Section } from './Section'
import { service } from '@/data/service'

export function ServiceSection() {
  return (
    <Section id="service" title="Service">
      <div className="space-y-6">
        {service.map((group) => (
          <div key={group.id}>
            <h3 className="text-lg font-semibold text-brand-heading">{group.heading}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-brand-muted marker:text-brand-subtle">
              {group.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
