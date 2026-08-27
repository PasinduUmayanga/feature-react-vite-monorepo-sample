import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
import { tutorialLessons } from '../../tutorials/tutorialMenu'
export function SharedUiLearningPage(props: Readonly<LessonPageProps>) { return <ArchitectureLessonPage lesson={tutorialLessons['shared-ui']} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)} /> }
