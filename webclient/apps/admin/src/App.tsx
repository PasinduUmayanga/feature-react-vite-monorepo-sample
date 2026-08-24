import { useState } from 'react'
import type { LoginCredentials } from '@template/ui'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { UserManagementPage } from './pages/UserManagementPage'
import { AuthenticationError, authenticateAdmin, clearAdminSession, readAdminSession, storeAdminSession, type AdminSession } from './services/dummyJsonAuth'

export function App() {
  const [session, setSession] = useState<AdminSession | null>(() => readAdminSession())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
  }

  if (session) return <UserManagementPage onSignOut={handleSignOut} />

  return <AdminLoginPage errorMessage={errorMessage} isSubmitting={isSubmitting} onSubmit={handleLogin} />
}
