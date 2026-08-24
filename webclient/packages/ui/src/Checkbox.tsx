import type { InputHTMLAttributes } from 'react'
import './form-controls.css'

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Checkbox({ label, className = '', ...props }: Readonly<CheckboxProps>) {
  return (
    <label className={`ui-choice ${className}`.trim()}>
      <input className="ui-choice__control" type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  )
}
