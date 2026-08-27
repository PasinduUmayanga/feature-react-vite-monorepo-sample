import { lazy, Suspense, useState } from 'react'
import { useDocumentTitle } from '@template/hooks'
import type { LoginCredentials } from '@template/ui'
import { AdminLoginPage } from './pages/AdminLoginPage'
import type { AdminPage } from './components/molecules/AdminNavigation'
import { AuthenticationError, authenticateAdmin, clearAdminSession, readAdminSession, storeAdminSession, type AdminSession } from './services/dummyJsonAuth'

const UserManagementPage = lazy(async () => ({
  default: (await import('./pages/UserManagementPage')).UserManagementPage,
}))

const UserReportsPage = lazy(async () => ({
  default: (await import('./pages/UserReportsPage')).UserReportsPage,
}))

export function App() {
  const [session, setSession] = useState<AdminSession | null>(() => readAdminSession())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [activePage, setActivePage] = useState<AdminPage>('users')
  useDocumentTitle(session ? `Kepler Admin — ${activePage === 'reports' ? 'User Reports' : 'User Management'}` : 'Kepler Admin — Administration Console')

  async function handleLogin(credentials: LoginCredentials) {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const authenticatedSession = await authenticateAdmin(credentials.identifier, credentials.password)
      storeAdminSession(authenticatedSession, credentials.remember)
      setSession(authenticatedSession)
    } catch (error) {
      setErrorMessage(error instanceof AuthenticationError ? error.message : 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleSignOut() {
    clearAdminSession()
    setSession(null)
    setActivePage('users')
  }

  if (session) {
    return (
      <Suspense fallback={<main className="admin-page" aria-busy="true">Loading workspace…</main>}>
        {activePage === 'reports'
          ? <UserReportsPage onNavigate={setActivePage} onSignOut={handleSignOut} />
          : <UserManagementPage onNavigate={setActivePage} onSignOut={handleSignOut} />}
      </Suspense>
    )
  }

  return <AdminLoginPage errorMessage={errorMessage} isSubmitting={isSubmitting} onSubmit={handleLogin} />
}
