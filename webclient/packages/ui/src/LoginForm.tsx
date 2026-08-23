import { useId, type FormEvent, type HTMLAttributes } from 'react'
import { Button } from './Button'
import './login-form.css'

export interface LoginCredentials {
  email: string
  password: string
  remember: boolean
}

export interface LoginFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  eyebrow?: string
  title: string
  description?: string
  submitLabel?: string
  forgotPasswordHref?: string
  onSubmit: (credentials: LoginCredentials) => void | Promise<void>
}

export function LoginForm({
  eyebrow,
  title,
  description,
  submitLabel = 'Sign in',
  forgotPasswordHref,
  onSubmit,
  className = '',
  ...props
}: LoginFormProps) {
  const emailId = useId()
  const passwordId = useId()
  const rememberId = useId()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    void onSubmit({
      email: String(data.get('email') ?? ''),
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
          <label htmlFor={emailId}>Email address</label>
          <input id={emailId} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </div>

        <div className="login-form__field">
          <div className="login-form__label-row">
            <label htmlFor={passwordId}>Password</label>
            {forgotPasswordHref && <a href={forgotPasswordHref}>Forgot password?</a>}
          </div>
          <input id={passwordId} name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />
        </div>

        <label className="login-form__remember" htmlFor={rememberId}>
          <input id={rememberId} name="remember" type="checkbox" />
          <span>Keep me signed in</span>
        </label>

        <Button className="login-form__submit" type="submit">{submitLabel}</Button>
      </form>
    </div>
  )
}
