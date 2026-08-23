import { useMemo, useState } from 'react'
import { initialUsers } from '../data'
import type { PanelState } from '../organisms/UserPanel'
import { UserManagementTemplate } from '../templates/UserManagementTemplate'
import type { User, UserDraft } from '../types'
import '../users.css'

interface UserManagementPageProps {
  onSignOut: () => void
}

export function UserManagementPage({ onSignOut }: UserManagementPageProps) {
  const [users, setUsers] = useState(initialUsers)
  const [query, setQuery] = useState('')
  const [panel, setPanel] = useState<PanelState | null>(null)

  const visibleUsers = useMemo(() => {
    const term = query.trim().toLowerCase()
    return term ? users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(term)) : users
  }, [query, users])

  function handleSave(draft: UserDraft) {
    if (panel?.mode === 'edit') {
      setUsers((current) => current.map((user) => user.id === panel.user.id ? { ...user, ...draft } : user))
    } else {
      setUsers((current) => [{ ...draft, id: `usr-${crypto.randomUUID()}`, createdAt: new Date().toISOString().slice(0, 10) }, ...current])
    }
    setPanel(null)
  }

  function handleDelete(user: User) {
    if (window.confirm(`Delete ${user.name}? This action cannot be undone.`)) {
      setUsers((current) => current.filter((candidate) => candidate.id !== user.id))
      if (panel && 'user' in panel && panel.user.id === user.id) setPanel(null)
    }
  }

  return <UserManagementTemplate users={visibleUsers} query={query} panel={panel} onQueryChange={setQuery} onCreate={() => setPanel({ mode: 'create' })} onView={(user) => setPanel({ mode: 'view', user })} onEdit={(user) => setPanel({ mode: 'edit', user })} onDelete={handleDelete} onClosePanel={() => setPanel(null)} onSave={handleSave} onSignOut={onSignOut} />
}
