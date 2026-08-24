import { useId, useState, type FormEvent } from 'react'
import { Button } from '@template/ui'
import { ActionButton } from '../atoms/ActionButton'
import { SelectField, TextField } from '../atoms/FormField'
import type { User, UserDraft, UserRole, UserStatus } from '../../types/user'

const roles: readonly UserRole[] = ['Administrator', 'Manager', 'Viewer']
const statuses: readonly UserStatus[] = ['Active', 'Invited', 'Suspended']

interface UserFormProps {
  user?: User
  onCancel: () => void
  onSave: (draft: UserDraft) => void
}

export function UserForm({ user, onCancel, onSave }: UserFormProps) {
  const formId = useId()
  const [draft, setDraft] = useState<UserDraft>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    role: user?.role ?? 'Viewer',
    status: user?.status ?? 'Invited',
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave(draft)
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <TextField id={`${formId}-name`} label="Full name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} autoComplete="name" required />
      <TextField id={`${formId}-email`} label="Email address" type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} autoComplete="email" required />
      <div className="user-form__row">
        <SelectField id={`${formId}-role`} label="Role" options={roles} value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value as UserRole })} />
        <SelectField id={`${formId}-status`} label="Status" options={statuses} value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as UserStatus })} />
      </div>
      <div className="user-form__footer">
        <ActionButton onClick={onCancel}>Cancel</ActionButton>
        <Button type="submit">{user ? 'Save changes' : 'Add user'}</Button>
      </div>
    </form>
  )
}
