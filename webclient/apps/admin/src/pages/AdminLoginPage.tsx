import type { LoginCredentials } from '@template/ui'
import { AdminLoginPanel } from '../components/organisms/AdminLoginPanel'
import { AdminLoginTemplate } from '../templates/AdminLoginTemplate'

interface AdminLoginPageProps {
  errorMessage: string | null
  isSubmitting: boolean
  onSubmit: (credentials: LoginCredentials) => Promise<void>
}

export function AdminLoginPage(props: Readonly<AdminLoginPageProps>) {
  return (
    <AdminLoginTemplate>
      <AdminLoginPanel {...props} />
    </AdminLoginTemplate>
  )
}
