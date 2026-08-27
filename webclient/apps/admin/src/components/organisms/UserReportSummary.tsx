import type { UserReport } from '@template/reports-feature'
import { formatDate } from '@template/utilities'

interface UserReportSummaryProps {
  report: UserReport
}

function formatGeneratedAt(value: string) {
  return formatDate(value, { dateStyle: 'medium', timeStyle: 'short' })
}

export function UserReportSummary({ report }: UserReportSummaryProps) {
  return (
    <div className="report-content">
      <div className="report-stat-grid">
        <article><span>Total users</span><strong>{report.totalUsers}</strong></article>
        {Object.entries(report.usersByStatus).map(([status, count]) => <article key={status}><span>{status}</span><strong>{count}</strong></article>)}
      </div>
      <div className="report-grid">
        <section className="report-card"><h2>Access by role</h2><dl>{Object.entries(report.usersByRole).map(([role, count]) => <div key={role}><dt>{role}</dt><dd>{count}</dd></div>)}</dl></section>
        <section className="report-card"><h2>Recently added</h2><ul>{report.recentUsers.map((user) => <li key={user.id}><strong>{user.name}</strong><span>{user.email}</span></li>)}</ul></section>
      </div>
      <p className="report-generated">Generated {formatGeneratedAt(report.generatedAt)}</p>
    </div>
  )
}
