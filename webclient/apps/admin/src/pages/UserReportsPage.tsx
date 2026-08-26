import { useUserReport } from '@template/reports-feature'
import type { AdminPage } from '../components/molecules/AdminNavigation'
import { reportsApi } from '../config/reports-api'
import { UserReportsTemplate } from '../templates/UserReportsTemplate'
import '../styles/reports.css'

interface UserReportsPageProps {
  onNavigate: (page: AdminPage) => void
  onSignOut: () => void
}

export function UserReportsPage({ onNavigate, onSignOut }: UserReportsPageProps) {
  const reportQuery = useUserReport(reportsApi)
  const errorMessage = reportQuery.isError ? 'Unable to load the user report. Please refresh and try again.' : null

  return <UserReportsTemplate report={reportQuery.data} isLoading={reportQuery.isLoading} errorMessage={errorMessage} onNavigate={onNavigate} onSignOut={onSignOut} />
}
