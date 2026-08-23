import { useState } from 'react'
import { LoginForm, type LoginCredentials } from '@template/ui'
import { UserManagementPage } from './features/users/pages/UserManagementPage'

export function App() {
  const [signedIn, setSignedIn] = useState(false)

  function handleLogin(_credentials: LoginCredentials) {
    setSignedIn(true)
  }

  if (signedIn) return <UserManagementPage onSignOut={() => setSignedIn(false)} />

  return (
    <main className="admin-login">
      <a className="brand" href="/" aria-label="Admin console home">Kepler / Admin</a>
      <LoginForm
        eyebrow="Restricted access"
        title="Admin sign in"
        description="Use your administrator credentials to access the console."
        submitLabel="Continue to console"
        forgotPasswordHref="#contact-support"
        onSubmit={handleLogin}
      />
      <p className="support">Need access? Contact your workspace owner.</p>
    </main>
  )
}
