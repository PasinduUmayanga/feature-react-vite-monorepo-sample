export type UserRole = 'Administrator' | 'Manager' | 'Viewer'
export type UserStatus = 'Active' | 'Invited' | 'Suspended'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
}

export type UserDraft = Pick<User, 'name' | 'email' | 'role' | 'status'>
