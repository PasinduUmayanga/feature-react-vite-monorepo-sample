import { tutorialLessons } from '../../tutorials/tutorialMenu'
import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
export function AuthTutorialPage(props: Readonly<LessonPageProps>) { return <ArchitectureLessonPage lesson={tutorialLessons.auth} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)} /> }
