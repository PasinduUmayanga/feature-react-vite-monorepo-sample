import { createHttpClient } from '@template/api-client'
import type { User, UserDraft } from '../types/user'

const client = createHttpClient({ baseUrl: 'https://dummyjson.com' })

interface DummyUser {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface DummyUserList {
  users: DummyUser[]
}

function mapUser(user: DummyUser): User {
  return {
    id: String(user.id),
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: 'Viewer',
    status: 'Active',
    createdAt: '2026-01-01',
  }
}

export async function getUsers() {
  const payload = await client.request<DummyUserList>('/users?limit=100')
  return payload.users.map(mapUser)
}

export async function createUser(draft: UserDraft): Promise<User> {
  const [firstName, ...lastName] = draft.name.trim().split(/\s+/)
  const payload = await client.request<DummyUser>('/users/add', {
    method: 'POST',
    body: { firstName, lastName: lastName.join(' '), email: draft.email },
  })
  return { ...mapUser(payload), ...draft }
}

export async function updateUser(user: User, draft: UserDraft): Promise<User> {
  const [firstName, ...lastName] = draft.name.trim().split(/\s+/)
  await client.request<DummyUser>(`/users/${user.id}`, {
    method: 'PATCH',
    body: { firstName, lastName: lastName.join(' '), email: draft.email },
  })
  return { ...user, ...draft }
}

export async function deleteUser(user: User) {
  await client.request<DummyUser>(`/users/${user.id}`, { method: 'DELETE' })
}
