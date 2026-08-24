import type { InputHTMLAttributes } from 'react'
import './form-controls.css'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  hint?: string
}

export function TextField({ id, label, hint, className = '', ...props }: Readonly<TextFieldProps>) {
  const hintId = hint && id ? `${id}-hint` : undefined

  return (
    <label className={`ui-field ${className}`.trim()} htmlFor={id}>
      <span className="ui-field__label">{label}</span>
      <input
        className="ui-field__input"
        id={id}
        type="text"
        aria-describedby={props['aria-describedby'] ?? hintId}
        {...props}
      />
      {hint ? <span className="ui-field__hint" id={hintId}>{hint}</span> : null}
    </label>
  )
}
