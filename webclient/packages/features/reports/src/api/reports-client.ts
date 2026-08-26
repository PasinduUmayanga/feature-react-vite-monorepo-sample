import { createUsersApi, type User, type UserRole, type UserStatus } from '@template/users-feature'
import type { UserReport } from '../types/report'

const statuses: readonly UserStatus[] = ['Active', 'Invited', 'Suspended']
const roles: readonly UserRole[] = ['Administrator', 'Manager', 'Viewer']

function countBy<T extends string>(values: readonly T[], options: readonly T[]) {
  return Object.fromEntries(options.map((option) => [option, values.filter((value) => value === option).length])) as Record<T, number>
}

function newestFirst(users: readonly User[]) {
  return [...users].sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt))
}

export function createReportsApi(baseUrl: string) {
  const usersApi = createUsersApi(baseUrl)

  async function getUserReport(): Promise<UserReport> {
    const users = await usersApi.getUsers()
    const orderedUsers = newestFirst(users)

    return {
      generatedAt: new Date().toISOString(),
      totalUsers: users.length,
      usersByStatus: countBy(users.map((user) => user.status), statuses),
      usersByRole: countBy(users.map((user) => user.role), roles),
      recentUsers: orderedUsers.slice(0, 5),
    }
  }

  return { getUserReport }
}

export type ReportsApi = ReturnType<typeof createReportsApi>
