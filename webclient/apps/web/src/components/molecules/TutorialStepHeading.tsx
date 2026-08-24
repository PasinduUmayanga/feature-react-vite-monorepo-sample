import type { ReactNode } from 'react'
import { StepBadge } from '../atoms/StepBadge'

interface TutorialStepHeadingProps {
  step: string
  title: string
  children: ReactNode
}

export function TutorialStepHeading({ step, title, children }: Readonly<TutorialStepHeadingProps>) {
  return (
    <div className="tutorial-step__heading">
      <StepBadge>{step}</StepBadge>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  )
}
