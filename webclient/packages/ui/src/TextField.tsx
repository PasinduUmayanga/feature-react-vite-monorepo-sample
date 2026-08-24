import type { InputHTMLAttributes } from 'react'
import './form-controls.css'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  hint?: string
  inputClassName?: string
}

export function TextField({ id, label, hint, className = '', inputClassName = '', ...props }: Readonly<TextFieldProps>) {
  const hintId = hint && id ? `${id}-hint` : undefined

  return (
    <label className={`ui-field ${className}`.trim()} htmlFor={id}>
      <span className="ui-field__label">{label}</span>
      <input
        {...props}
        className={`ui-field__input ${inputClassName}`.trim()}
        id={id}
        type="text"
        aria-describedby={props['aria-describedby'] ?? hintId}
      />
      {hint ? <span className="ui-field__hint" id={hintId}>{hint}</span> : null}
    </label>
  )
}
