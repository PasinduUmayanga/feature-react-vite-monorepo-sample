import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
import { tutorialLessons } from '../../tutorials/tutorialMenu'
export function AtomicDesignLearningPage(props: Readonly<LessonPageProps>) { return <ArchitectureLessonPage lesson={tutorialLessons['atomic-design']} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)} /> }
