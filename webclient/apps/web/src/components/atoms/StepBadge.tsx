interface StepBadgeProps {
  children: string
}

export function StepBadge({ children }: Readonly<StepBadgeProps>) {
  return <span className="tutorial-step__badge" aria-hidden="true">{children}</span>
}
