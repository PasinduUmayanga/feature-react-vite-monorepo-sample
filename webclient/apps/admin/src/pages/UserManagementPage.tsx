import { useMemo, useState } from 'react'
import { useCreateUser, useDeleteUser, useUpdateUser, useUsers, type User, type UserDraft } from '@template/users-feature'
import type { PanelState } from '../components/organisms/UserPanel'
import { UserManagementTemplate } from '../templates/UserManagementTemplate'
import '../styles/users.css'

interface UserManagementPageProps {
  onSignOut: () => void
}

export function UserManagementPage({ onSignOut }: UserManagementPageProps) {
  const usersQuery = useUsers()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()
  const [query, setQuery] = useState('')
  const [panel, setPanel] = useState<PanelState | null>(null)
  const [mutationError, setMutationError] = useState<string | null>(null)
  const isSaving = createUser.isPending || updateUser.isPending

  const visibleUsers = useMemo(() => {
    const users = usersQuery.data ?? []
    const term = query.trim().toLowerCase()
    return term ? users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(term)) : users
  }, [query, usersQuery.data])

  async function handleSave(draft: UserDraft) {
    setMutationError(null)
    try {
      if (panel?.mode === 'edit') await updateUser.mutateAsync({ user: panel.user, draft })
      else await createUser.mutateAsync(draft)
      setPanel(null)
    } catch {
      setMutationError('Unable to save this user. Please try again.')
    }
  }

  async function handleDelete(user: User) {
    if (window.confirm(`Delete ${user.name}? This action cannot be undone.`)) {
      setMutationError(null)
      try {
        await deleteUser.mutateAsync(user)
        if (panel && 'user' in panel && panel.user.id === user.id) setPanel(null)
      } catch {
        setMutationError('Unable to delete this user. Please try again.')
      }
    }
  }

  const errorMessage = usersQuery.isError ? 'Unable to load users. Please refresh and try again.' : mutationError

  return <UserManagementTemplate users={visibleUsers} query={query} panel={panel} isLoading={usersQuery.isLoading} isSaving={isSaving} errorMessage={errorMessage} onQueryChange={setQuery} onCreate={() => setPanel({ mode: 'create' })} onView={(user) => setPanel({ mode: 'view', user })} onEdit={(user) => setPanel({ mode: 'edit', user })} onDelete={handleDelete} onClosePanel={() => setPanel(null)} onSave={handleSave} onSignOut={onSignOut} />
}
