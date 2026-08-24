import type { ReactNode } from 'react'

interface TutorialPageTemplateProps {
  children: ReactNode
}

export function TutorialPageTemplate({ children }: Readonly<TutorialPageTemplateProps>) {
  return (
    <main className="guide-shell">
      {children}
      <footer><span>Built from the same monorepo it documents.</span><code>@template/ui</code></footer>
    </main>
  )
}
