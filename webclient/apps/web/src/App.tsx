import { useDocumentTitle } from '@template/hooks'
import { MonorepoTutorialPage } from './pages/MonorepoTutorialPage'

export function App() {
  useDocumentTitle('Kepler Web — Monorepo Tutorial')
  return <MonorepoTutorialPage />
}
