import { Button } from '@template/ui'
import { UserPanel, type PanelState } from '../components/organisms/UserPanel'
import { UserTable } from '../components/organisms/UserTable'
import type { User, UserDraft } from '../types/user'

interface UserManagementTemplateProps {
  users: User[]
  query: string
  panel: PanelState | null
  onQueryChange: (query: string) => void
  onCreate: () => void
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onClosePanel: () => void
  onSave: (draft: UserDraft) => void
  onSignOut: () => void
}

export function UserManagementTemplate(props: UserManagementTemplateProps) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="#users">Kepler <span>Admin</span></a>
        <nav aria-label="Admin navigation"><a className="active" href="#users">Users</a><a href="#roles">Roles</a><a href="#settings">Settings</a></nav>
        <button className="sign-out" type="button" onClick={props.onSignOut}>Sign out</button>
      </aside>
      <main className="admin-content">
        <header className="page-header"><div><span className="page-eyebrow">Directory</span><h1>User management</h1><p>Create accounts, assign access, and manage user status.</p></div><Button onClick={props.onCreate}>Add user</Button></header>
        <section className="user-directory" aria-labelledby="directory-title">
          <div className="directory-toolbar"><div><h2 id="directory-title">All users</h2><span>{props.users.length} shown</span></div><label className="search-field"><span className="sr-only">Search users</span><input type="search" placeholder="Search name or email" value={props.query} onChange={(event) => props.onQueryChange(event.target.value)} /></label></div>
          <UserTable users={props.users} onView={props.onView} onEdit={props.onEdit} onDelete={props.onDelete} />
        </section>
      </main>
      {props.panel && <UserPanel panel={props.panel} onClose={props.onClosePanel} onSave={props.onSave} />}
    </div>
  )
}
