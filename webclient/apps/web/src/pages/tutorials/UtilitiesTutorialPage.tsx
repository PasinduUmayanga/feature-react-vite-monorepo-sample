import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
import { tutorialLessons } from '../../tutorials/tutorialMenu'
export function UtilitiesTutorialPage(props: Readonly<LessonPageProps>) { return <ArchitectureLessonPage lesson={tutorialLessons.utilities} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)} /> }
