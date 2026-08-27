import { useEffect, useState, type ComponentType } from 'react'
import { ArchitectureMenu } from '../components/organisms/ArchitectureMenu'
import { useLessonProgress } from '../hooks/useLessonProgress'
import { TutorialPageTemplate } from '../templates/TutorialPageTemplate'
import { isLessonId, type LessonId, tutorialLessons } from '../tutorials/tutorialMenu'
import { AdminApplicationTutorialPage } from './tutorials/AdminApplicationTutorialPage'
import { ApiClientTutorialPage } from './tutorials/ApiClientTutorialPage'
import { AtomicDesignLearningPage } from './tutorials/AtomicDesignLearningPage'
import { AuthTutorialPage } from './tutorials/AuthTutorialPage'
import { ConfigTutorialPage } from './tutorials/ConfigTutorialPage'
import { DocumentationTutorialPage } from './tutorials/DocumentationTutorialPage'
import { EnvironmentTutorialPage } from './tutorials/EnvironmentTutorialPage'
import { EslintConfigTutorialPage } from './tutorials/EslintConfigTutorialPage'
import { HooksLearningPage } from './tutorials/HooksLearningPage'
import type { LessonPageProps } from './tutorials/LessonPageProps'
import { ReportsFeatureTutorialPage } from './tutorials/ReportsFeatureTutorialPage'
import { SharedUiLearningPage } from './tutorials/SharedUiLearningPage'
import { UsersFeatureTutorialPage } from './tutorials/UsersFeatureTutorialPage'
import { UtilitiesTutorialPage } from './tutorials/UtilitiesTutorialPage'
import { WebApplicationTutorialPage } from './tutorials/WebApplicationTutorialPage'
import { WorkspaceTutorialPage } from './tutorials/WorkspaceTutorialPage'

const lessonPages: Record<LessonId, ComponentType<LessonPageProps>> = {
  workspace: WorkspaceTutorialPage,
  'web-app': WebApplicationTutorialPage,
  'admin-app': AdminApplicationTutorialPage,
  'atomic-design': AtomicDesignLearningPage,
  'shared-ui': SharedUiLearningPage,
  hooks: HooksLearningPage,
  utilities: UtilitiesTutorialPage,
  'api-client': ApiClientTutorialPage,
  auth: AuthTutorialPage,
  config: ConfigTutorialPage,
  'users-feature': UsersFeatureTutorialPage,
  'reports-feature': ReportsFeatureTutorialPage,
  'eslint-config': EslintConfigTutorialPage,
  environment: EnvironmentTutorialPage,
  documentation: DocumentationTutorialPage,
}

function readLessonId(): LessonId {
  const value = window.location.hash.replace('#/tutorials/', '').split('?')[0]
  return isLessonId(value) ? value : 'workspace'
}

export function MonorepoTutorialPage() {
  const [activeLesson, setActiveLesson] = useState<LessonId>(readLessonId)
  const { completedLessons, toggleLesson } = useLessonProgress()
  const LessonPage = lessonPages[activeLesson]
  const lesson = tutorialLessons[activeLesson]

  useEffect(() => {
    function syncRoute() {
      setActiveLesson(readLessonId())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  return <TutorialPageTemplate><header className="learning-topbar"><a href="#/tutorials/workspace">Kepler <span>Learn</span></a><p>{completedLessons.length} / {Object.keys(tutorialLessons).length} lessons complete</p></header><div className="learning-layout"><ArchitectureMenu activeLesson={activeLesson} completedLessons={completedLessons} /><main><nav className="learning-breadcrumb" aria-label="Current lesson"><span>webclient</span><span>/</span><span>{lesson.path}</span></nav><LessonPage lessonId={activeLesson} complete={completedLessons.includes(activeLesson)} onToggleComplete={toggleLesson} /></main></div></TutorialPageTemplate>
}
