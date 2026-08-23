import { LoginForm, type LoginCredentials } from '@template/ui'

export function App() {
  function handleLogin(credentials: LoginCredentials) {
    console.info('Admin login submitted for', credentials.email)
  }

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
