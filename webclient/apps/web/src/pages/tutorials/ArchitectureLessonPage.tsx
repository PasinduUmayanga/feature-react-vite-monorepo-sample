import { useState, type ReactNode } from 'react'
import type { TutorialLesson } from '../../tutorials/tutorialMenu'

interface ArchitectureLessonPageProps {
  lesson: TutorialLesson
  complete: boolean
  onToggleComplete: () => void
  children?: ReactNode
}

export function ArchitectureLessonPage({ lesson, complete, onToggleComplete, children }: Readonly<ArchitectureLessonPageProps>) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    await navigator.clipboard.writeText(lesson.code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return <section className="learning-lesson"><header className="learning-lesson__header"><p>{lesson.path}</p><h1>{lesson.title}</h1><p>{lesson.summary}</p><button type="button" onClick={onToggleComplete} aria-pressed={complete}>{complete ? 'Completed ✓' : 'Mark complete'}</button></header><aside className="learning-lesson__ownership"><strong>Ownership and benefit</strong><p>{lesson.ownership}</p><p>Benefit: one explicit boundary prevents duplicate implementations and lets consumers change independently behind the package API.</p></aside><article className="learning-code"><div><span>{lesson.path}</span><button type="button" onClick={() => void copyCode()}>{copied ? 'Copied' : 'Copy code'}</button></div><pre><code>{lesson.code}</code></pre></article><section className="learning-lesson__practice"><h2>Develop and use it</h2><ol><li>Develop focused source below the package or application <code>src</code> folder.</li><li>Export supported APIs from <code>src/index.ts</code> when it is a shared package.</li><li>Add consumers with <code>workspace:*</code>, never a relative cross-package import.</li><li>Run <code>pnpm lint</code>, <code>pnpm typecheck</code>, and <code>pnpm build</code>.</li></ol><p>Copy this implementation-faithful excerpt, inspect the named file, then follow its imports to the next boundary.</p>{children}</section></section>
}
