import type { TutorialPageProps } from './TutorialPageProps'

export function SetupTutorialPage({ children }: TutorialPageProps) {
  return <section className="setup-section" id="setup">{children}</section>
}
