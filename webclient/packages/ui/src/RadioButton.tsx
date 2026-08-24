import type { InputHTMLAttributes } from 'react'
import './form-controls.css'

export type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  inputClassName?: string
}

export function RadioButton({ label, className = '', inputClassName = '', ...props }: Readonly<RadioButtonProps>) {
  return (
    <label className={`ui-choice ${className}`.trim()}>
      <input {...props} className={`ui-choice__control ${inputClassName}`.trim()} type="radio" />
      <span>{label}</span>
    </label>
  )
}
