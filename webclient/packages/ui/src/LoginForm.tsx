import { useId, type FormEvent, type HTMLAttributes } from 'react'
import { Button } from './Button'
import './login-form.css'

export interface LoginCredentials {
  identifier: string
  password: string
  remember: boolean
}

export interface LoginFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  eyebrow?: string
  title: string
  description?: string
  submitLabel?: string
  identifierLabel?: string
  identifierPlaceholder?: string
  identifierType?: 'email' | 'text'
  identifierAutoComplete?: 'email' | 'username'
  forgotPasswordHref?: string
  errorMessage?: string | null
  isSubmitting?: boolean
  onSubmit: (credentials: LoginCredentials) => void | Promise<void>
}

export function LoginForm({
  eyebrow,
  title,
  description,
  submitLabel = 'Sign in',
  identifierLabel = 'Email address',
  identifierPlaceholder = 'you@example.com',
  identifierType = 'email',
  identifierAutoComplete = 'email',
  forgotPasswordHref,
  errorMessage,
  isSubmitting = false,
  onSubmit,
  className = '',
  ...props
}: Readonly<LoginFormProps>) {
  const emailId = useId()
  const passwordId = useId()
  const rememberId = useId()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    void onSubmit({
      identifier: String(data.get('identifier') ?? ''),
      password: String(data.get('password') ?? ''),
      remember: data.get('remember') === 'on',
    })
  }

  return (
    <div className={`login-card ${className}`.trim()} {...props}>
      <div className="login-card__heading">
        {eyebrow && <span className="login-card__eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__field">
          <label htmlFor={emailId}>{identifierLabel}</label>
          <input id={emailId} name="identifier" type={identifierType} autoComplete={identifierAutoComplete} placeholder={identifierPlaceholder} disabled={isSubmitting} required />
        </div>

        <div className="login-form__field">
          <div className="login-form__label-row">
            <label htmlFor={passwordId}>Password</label>
            {forgotPasswordHref && <a href={forgotPasswordHref}>Forgot password?</a>}
          </div>
          <input id={passwordId} name="password" type="password" autoComplete="current-password" placeholder="Enter your password" disabled={isSubmitting} required />
        </div>

        <label className="login-form__remember" htmlFor={rememberId}>
          <input id={rememberId} name="remember" type="checkbox" disabled={isSubmitting} />
          <span>Keep me signed in</span>
        </label>

        {errorMessage && <p className="login-form__error" role="alert">{errorMessage}</p>}

        <Button className="login-form__submit" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? 'Signing in…' : submitLabel}
        </Button>
      </form>
    </div>
  )
}
