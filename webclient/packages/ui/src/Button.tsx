import type { ButtonHTMLAttributes, CSSProperties } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const styles: CSSProperties = {
  border: 0,
  borderRadius: '999px',
  padding: '0.85rem 1.3rem',
  color: '#08110e',
  background: '#8ef0cf',
  cursor: 'pointer',
  fontWeight: 750,
  boxShadow: '0 10px 30px rgba(33, 201, 151, 0.2)',
}

export function Button({ style, ...props }: Readonly<ButtonProps>) {
  return <button style={{ ...styles, ...style }} {...props} />
}
