import { useState } from 'react'
import { useDocumentTitle } from '@template/hooks'
import type { LoginCredentials } from '@template/ui'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { UserManagementPage } from './pages/UserManagementPage'
import { UserReportsPage } from './pages/UserReportsPage'
import type { AdminPage } from './components/molecules/AdminNavigation'
import { AuthenticationError, authenticateAdmin, clearAdminSession, readAdminSession, storeAdminSession, type AdminSession } from './services/dummyJsonAuth'

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

  if (session) return activePage === 'reports'
    ? <UserReportsPage onNavigate={setActivePage} onSignOut={handleSignOut} />
    : <UserManagementPage onNavigate={setActivePage} onSignOut={handleSignOut} />

  return <AdminLoginPage errorMessage={errorMessage} isSubmitting={isSubmitting} onSubmit={handleLogin} />
}
