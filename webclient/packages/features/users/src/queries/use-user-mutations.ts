import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UsersApi } from '../api/users-client'
import type { User, UserDraft } from '../types/user'
import { userKeys } from './user-keys'

export function useCreateUser(usersApi: UsersApi) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: (createdUser) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (users = []) => [createdUser, ...users])
    },
  })
}

export function useUpdateUser(usersApi: UsersApi) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ user, draft }: { user: User; draft: UserDraft }) => usersApi.updateUser(user, draft),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (users = []) => users.map((user) => user.id === updatedUser.id ? updatedUser : user))
    },
  })
}

export function useDeleteUser(usersApi: UsersApi) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: (_, deletedUser) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (users = []) => users.filter((user) => user.id !== deletedUser.id))
    },
  })
}
