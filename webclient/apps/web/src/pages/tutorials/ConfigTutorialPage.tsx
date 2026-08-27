import { tutorialLessons } from '../../tutorials/tutorialMenu'
import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
export function ConfigTutorialPage(props: Readonly<LessonPageProps>) { return <ArchitectureLessonPage lesson={tutorialLessons.config} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)} /> }
