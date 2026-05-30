import type { ReactNode } from 'react'

// Matches **bold** or [text](url).
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g

// Markdown-style escapes used in the source content (\* equal-contribution, \# senior author).
function unescape(s: string): string {
  return s.replace(/\\([*#])/g, '$1')
}

/** Render a small subset of inline markdown (**bold** and [links]) into React nodes. */
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) nodes.push(unescape(text.slice(last, m.index)))
    if (m[1] !== undefined) {
      nodes.push(<strong key={key++}>{m[1]}</strong>)
    } else {
      nodes.push(
        <a key={key++} href={m[3]} target="_blank" rel="noopener noreferrer">
          {m[2]}
        </a>,
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(unescape(text.slice(last)))
  return nodes
}
