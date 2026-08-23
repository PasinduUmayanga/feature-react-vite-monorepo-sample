import { ActionButton } from '../atoms/ActionButton'
import { StatusBadge } from '../atoms/StatusBadge'
import { UserForm } from '../molecules/UserForm'
import type { User, UserDraft } from '../types'

export type PanelState = { mode: 'create' } | { mode: 'view' | 'edit'; user: User }

interface UserPanelProps {
  panel: PanelState
  onClose: () => void
  onSave: (draft: UserDraft) => void
}

export function UserPanel({ panel, onClose, onSave }: UserPanelProps) {
  const title = panel.mode === 'create' ? 'Add user' : panel.mode === 'edit' ? 'Edit user' : 'User details'

  return (
    <div className="panel-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="user-panel" role="dialog" aria-modal="true" aria-labelledby="user-panel-title">
        <header className="user-panel__header">
          <div><span>User management</span><h2 id="user-panel-title">{title}</h2></div>
          <ActionButton aria-label="Close panel" onClick={onClose}>Close</ActionButton>
        </header>
        {panel.mode === 'view' ? (
          <dl className="user-details">
            <div><dt>Name</dt><dd>{panel.user.name}</dd></div>
            <div><dt>Email</dt><dd>{panel.user.email}</dd></div>
            <div><dt>Role</dt><dd>{panel.user.role}</dd></div>
            <div><dt>Status</dt><dd><StatusBadge status={panel.user.status} /></dd></div>
            <div><dt>Created</dt><dd>{new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(panel.user.createdAt))}</dd></div>
          </dl>
        ) : <UserForm user={panel.mode === 'edit' ? panel.user : undefined} onCancel={onClose} onSave={onSave} />}
      </section>
    </div>
  )
}
