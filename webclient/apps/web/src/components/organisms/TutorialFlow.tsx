import type { ReactNode } from 'react'

interface TutorialFlowProps {
  children: ReactNode
}

export function TutorialFlow({ children }: Readonly<TutorialFlowProps>) {
  return <div className="tutorial-flow">{children}</div>
}
