import { ArchitectureLessonPage } from './ArchitectureLessonPage'
import type { LessonPageProps } from './LessonPageProps'
import { tutorialLessons } from '../../tutorials/tutorialMenu'
export function WorkspaceTutorialPage(props: Readonly<LessonPageProps>) {
  return <ArchitectureLessonPage lesson={tutorialLessons.workspace} complete={props.complete} onToggleComplete={() => props.onToggleComplete(props.lessonId)}><div className="repository-explainer"><h3>What this application builds</h3><p>Kepler is a scalable React monorepo: <code>apps/web</code> teaches the architecture, while <code>apps/admin</code> applies it to user management and reports. Reusable capabilities live in <code>packages</code>; operations and decisions live in <code>docs</code>.</p><p>Use the folder tree as the system map. Every folder opens into a submenu, and every visible file includes its responsibility. Select a green lesson item to study the real code and its boundary.</p></div></ArchitectureLessonPage>
}
