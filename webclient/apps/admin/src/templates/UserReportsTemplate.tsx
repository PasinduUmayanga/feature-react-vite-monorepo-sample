import type { UserReport } from '@template/reports-feature'
import { AdminNavigation, type AdminPage } from '../components/molecules/AdminNavigation'
import { UserReportSummary } from '../components/organisms/UserReportSummary'

interface UserReportsTemplateProps {
  report: UserReport | undefined
  isLoading: boolean
  errorMessage: string | null
  onNavigate: (page: AdminPage) => void
  onSignOut: () => void
}

export function UserReportsTemplate({ report, isLoading, errorMessage, onNavigate, onSignOut }: UserReportsTemplateProps) {
  return (
    <div className="admin-shell" id="top">
      <AdminNavigation activePage="reports" onNavigate={onNavigate} onSignOut={onSignOut} />
      <main className="admin-content">
        <header className="page-header"><div><span className="page-eyebrow">Directory insights</span><h1>User reports</h1><p>Monitor account volume, status distribution, and recent directory activity.</p></div></header>
        <p className="report-notice" role="note"><strong>Demo data:</strong> role and status figures reflect the mapped DummyJSON user data. Connect a reporting service before using these metrics operationally.</p>
        {errorMessage ? <p className="user-feedback" role="alert">{errorMessage}</p> : isLoading ? <div className="empty-state" role="status">Loading user report…</div> : report ? <UserReportSummary report={report} /> : <div className="empty-state">No report data is available.</div>}
      </main>
    </div>
  )
}
