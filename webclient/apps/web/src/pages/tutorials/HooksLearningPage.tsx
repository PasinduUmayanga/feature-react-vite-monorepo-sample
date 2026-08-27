import { HooksPlayground } from '../../components/organisms/HooksPlayground'
import { tutorialLessons } from '../../tutorials/tutorialMenu'
import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'

export function HooksLearningPage(props: Readonly<LessonPageProps>) {
  return <ArchitectureLessonPage lesson={tutorialLessons.hooks} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)}><HooksPlayground /></ArchitectureLessonPage>
}
