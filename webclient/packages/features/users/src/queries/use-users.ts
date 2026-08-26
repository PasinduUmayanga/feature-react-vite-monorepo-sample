import { useQuery } from '@tanstack/react-query'
import type { UsersApi } from '../api/users-client'
import { userKeys } from './user-keys'

export function useUsers(usersApi: UsersApi) {
  return useQuery({ queryKey: userKeys.lists(), queryFn: usersApi.getUsers, staleTime: 60_000 })
}
