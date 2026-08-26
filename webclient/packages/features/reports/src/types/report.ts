import type { User, UserRole, UserStatus } from '@template/users-feature'

export interface UserReport {
  generatedAt: string
  totalUsers: number
  usersByStatus: Record<UserStatus, number>
  usersByRole: Record<UserRole, number>
  recentUsers: User[]
}
