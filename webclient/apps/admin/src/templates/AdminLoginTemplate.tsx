import type { ReactNode } from 'react'
import { AdminBrand } from '../components/atoms/AdminBrand'

interface AdminLoginTemplateProps {
  children: ReactNode
}

export function AdminLoginTemplate({ children }: Readonly<AdminLoginTemplateProps>) {
  return (
    <main className="admin-login">
      <AdminBrand />
      {children}
    </main>
  )
}
