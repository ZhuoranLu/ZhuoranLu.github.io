import { Section } from './Section'
import { service } from '@/data/service'

export function ServiceSection() {
  return (
    <Section id="service" title="Service">
      <div className="space-y-5">
        {service.map((group) => (
          <div key={group.id}>
            <h3 className="font-semibold text-brand-heading">{group.heading}</h3>
            <ul className="list-disc pl-6 text-sm text-brand-text/90">
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
