import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
import { tutorialLessons } from '../../tutorials/tutorialMenu'
export function UsersFeatureTutorialPage(props: Readonly<LessonPageProps>) { return <ArchitectureLessonPage lesson={tutorialLessons['users-feature']} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)} /> }
