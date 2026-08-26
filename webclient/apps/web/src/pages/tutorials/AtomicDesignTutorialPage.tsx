import type { TutorialPageProps } from './TutorialPageProps'

export function AtomicDesignTutorialPage({ children }: TutorialPageProps) {
  return <section className="atomic-section" id="atomic-design">{children}</section>
}
