import type { InputHTMLAttributes } from 'react'
import './form-controls.css'

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  inputClassName?: string
}

export function Checkbox({ label, className = '', inputClassName = '', ...props }: Readonly<CheckboxProps>) {
  return (
    <label className={`ui-choice ${className}`.trim()}>
      <input {...props} className={`ui-choice__control ${inputClassName}`.trim()} type="checkbox" />
      <span>{label}</span>
    </label>
  )
}
