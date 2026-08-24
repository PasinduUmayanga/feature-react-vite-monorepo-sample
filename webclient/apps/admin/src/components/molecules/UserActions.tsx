import { ActionButton } from '../atoms/ActionButton'
import type { User } from '../../types/user'

interface UserActionsProps {
  user: User
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UserActions({ user, onView, onEdit, onDelete }: UserActionsProps) {
  return (
    <div className="user-actions" aria-label={`Actions for ${user.name}`}>
      <ActionButton onClick={() => onView(user)}>View</ActionButton>
      <ActionButton onClick={() => onEdit(user)}>Edit</ActionButton>
      <ActionButton tone="danger" onClick={() => onDelete(user)}>Delete</ActionButton>
    </div>
  )
}
