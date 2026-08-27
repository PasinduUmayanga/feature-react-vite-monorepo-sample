import type { LessonId } from '../../tutorials/tutorialMenu'

export interface LessonPageProps {
  complete: boolean
  lessonId: LessonId
  onToggleComplete: (lessonId: LessonId) => void
}
