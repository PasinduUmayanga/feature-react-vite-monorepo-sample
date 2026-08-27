import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
import { tutorialLessons } from '../../tutorials/tutorialMenu'
export function AdminApplicationTutorialPage(props: Readonly<LessonPageProps>) { return <ArchitectureLessonPage lesson={tutorialLessons['admin-app']} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)} /> }
