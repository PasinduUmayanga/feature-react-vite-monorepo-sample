import type { ButtonHTMLAttributes } from 'react'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: 'default' | 'danger'
}

export function ActionButton({ tone = 'default', className = '', ...props }: ActionButtonProps) {
  return <button className={`action-button action-button--${tone} ${className}`.trim()} type="button" {...props} />
}
