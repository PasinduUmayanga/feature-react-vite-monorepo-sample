import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
import { tutorialLessons } from '../../tutorials/tutorialMenu'
export function ReportsFeatureTutorialPage(props: Readonly<LessonPageProps>) { return <ArchitectureLessonPage lesson={tutorialLessons['reports-feature']} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)} /> }
