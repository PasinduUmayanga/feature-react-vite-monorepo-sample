import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: readonly string[]
}

export function TextField({ label, id, ...props }: TextFieldProps) {
  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} {...props} />
    </label>
  )
}

export function SelectField({ label, id, options, ...props }: SelectFieldProps) {
  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} {...props}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}
