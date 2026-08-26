import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser, deleteUser, updateUser } from '../api/users-client'
import type { User, UserDraft } from '../types/user'
import { userKeys } from './user-keys'

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: (createdUser) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (users = []) => [createdUser, ...users])
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ user, draft }: { user: User; draft: UserDraft }) => updateUser(user, draft),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (users = []) => users.map((user) => user.id === updatedUser.id ? updatedUser : user))
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, deletedUser) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (users = []) => users.filter((user) => user.id !== deletedUser.id))
    },
  })
}
