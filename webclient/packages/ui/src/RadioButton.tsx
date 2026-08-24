import type { InputHTMLAttributes } from 'react'
import './form-controls.css'

export type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function RadioButton({ label, className = '', ...props }: Readonly<RadioButtonProps>) {
  return (
    <label className={`ui-choice ${className}`.trim()}>
      <input className="ui-choice__control" type="radio" {...props} />
      <span>{label}</span>
    </label>
  )
}
