import { useState } from 'react'
import { LoginForm, type LoginCredentials } from '@template/ui'
import { AuthenticationError, authenticateAdmin, clearAdminSession, readAdminSession, storeAdminSession, type AdminSession } from './features/auth/dummyJsonAuth'
import { UserManagementPage } from './features/users/pages/UserManagementPage'

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

  return (
    <main className="admin-login">
      <a className="brand" href="/" aria-label="Admin console home">Kepler / Admin</a>
      <LoginForm
        eyebrow="Restricted access"
        title="Admin sign in"
        description="Sign in with a DummyJSON demo account to access the console."
        submitLabel="Continue to console"
        identifierLabel="Username"
        identifierPlaceholder="Enter your username"
        identifierType="text"
        identifierAutoComplete="username"
        forgotPasswordHref="#contact-support"
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
        onSubmit={handleLogin}
      />
      <p className="support">Demo account: <strong>emilys</strong> / <strong>emilyspass</strong></p>
    </main>
  )
}
