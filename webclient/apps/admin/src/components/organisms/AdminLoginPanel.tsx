import { LoginForm, type LoginCredentials } from '@template/ui'
import { DemoCredentials } from '../molecules/DemoCredentials'

interface AdminLoginPanelProps {
  errorMessage: string | null
  isSubmitting: boolean
  onSubmit: (credentials: LoginCredentials) => Promise<void>
}

export function AdminLoginPanel({ errorMessage, isSubmitting, onSubmit }: Readonly<AdminLoginPanelProps>) {
  return (
    <>
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
        onSubmit={onSubmit}
      />
      <DemoCredentials />
    </>
  )
}
