import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/users-client'
import { userKeys } from './user-keys'

export function useUsers() {
  return useQuery({ queryKey: userKeys.lists(), queryFn: getUsers, staleTime: 60_000 })
}
