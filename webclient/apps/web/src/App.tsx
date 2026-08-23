import { LoginForm, type LoginCredentials } from '@template/ui'

export function App() {
  function handleLogin(credentials: LoginCredentials) {
    console.info('Web login submitted for', credentials.email)
  }

  return (
    <main className="page-shell">
      <div className="login-layout">
        <section className="welcome" aria-labelledby="welcome-title">
          <span>Kepler workspace</span>
          <h2 id="welcome-title">Welcome back to your next big idea.</h2>
          <p>Sign in to continue building, collaborating, and shipping.</p>
        </section>
        <LoginForm
          eyebrow="Member access"
          title="Sign in"
          description="Enter your account details to continue."
          forgotPasswordHref="#forgot-password"
          onSubmit={handleLogin}
        />
      </div>
    </main>
  )
}
