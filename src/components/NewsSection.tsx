import { Section } from './Section'
import { renderInline } from '@/lib/inline'
import { news } from '@/data/news'

export function NewsSection() {
  return (
    <Section id="news" title="News">
      <ul className="divide-y divide-brand-border">
        {news.map((item) => (
          <li
            key={item.id}
            className="rounded px-2 py-3 transition-colors hover:bg-[#F4F6F8]"
          >
            <span className="mr-2 italic text-brand-text/70">{item.date}</span>
            {renderInline(item.text)}
          </li>
        ))}
      </ul>
    </Section>
  )
}
