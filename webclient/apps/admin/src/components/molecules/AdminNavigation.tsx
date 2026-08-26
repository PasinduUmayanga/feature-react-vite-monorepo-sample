export type AdminPage = 'users' | 'reports'

interface AdminNavigationProps {
  activePage: AdminPage
  onNavigate: (page: AdminPage) => void
  onSignOut: () => void
}

export function AdminNavigation({ activePage, onNavigate, onSignOut }: AdminNavigationProps) {
  return (
    <aside className="admin-sidebar">
      <a className="admin-brand" href="#top">Kepler <span>Admin</span></a>
      <nav aria-label="Admin navigation">
        <button className={activePage === 'users' ? 'active' : ''} type="button" onClick={() => onNavigate('users')}>Users</button>
        <button className={activePage === 'reports' ? 'active' : ''} type="button" onClick={() => onNavigate('reports')}>Reports</button>
      </nav>
      <button className="sign-out" type="button" onClick={onSignOut}>Sign out</button>
    </aside>
  )
}
