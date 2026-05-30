import { Section } from './Section'
import { renderInline } from '@/lib/inline'
import { news } from '@/data/news'

export function NewsSection() {
  return (
    <Section id="news" title="News">
      <ul className="space-y-1">
        {news.map((item) => (
          <li
            key={item.id}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-surface"
          >
            <span className="mr-2 font-medium text-brand-subtle">{item.date}</span>
            {renderInline(item.text)}
          </li>
        ))}
      </ul>
    </Section>
  )
}
