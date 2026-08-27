import { StatusBadge } from '../atoms/StatusBadge'
import { UserActions } from '../molecules/UserActions'
import type { User } from '@template/users-feature'
import { formatDate } from '@template/utilities'

interface UserTableProps {
  users: User[]
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UserTable({ users, onView, onEdit, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return <div className="empty-state"><strong>No users found</strong><span>Try another search or add a new user.</span></div>
  }

  return (
    <div className="table-scroll">
      <table>
        <thead><tr><th scope="col">User</th><th scope="col">Role</th><th scope="col">Status</th><th scope="col">Added</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><strong>{user.name}</strong><span>{user.email}</span></td>
              <td>{user.role}</td>
              <td><StatusBadge status={user.status} /></td>
              <td>{formatDate(user.createdAt)}</td>
              <td><UserActions user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
