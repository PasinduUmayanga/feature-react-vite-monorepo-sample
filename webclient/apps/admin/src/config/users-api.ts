import { createUsersApi } from '@template/users-feature'
import { environment } from './environment'

export const usersApi = createUsersApi(environment.apiBaseUrl)
