import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
import { tutorialLessons } from '../../tutorials/tutorialMenu'
export function DocumentationTutorialPage(props: Readonly<LessonPageProps>) { return <ArchitectureLessonPage lesson={tutorialLessons.documentation} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)} /> }
