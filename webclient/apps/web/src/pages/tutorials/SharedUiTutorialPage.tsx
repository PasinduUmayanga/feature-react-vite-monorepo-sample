import type { TutorialPageProps } from './TutorialPageProps'

export function SharedUiTutorialPage({ children }: TutorialPageProps) {
  return <section className="shared-section" id="shared-ui">{children}</section>
}
