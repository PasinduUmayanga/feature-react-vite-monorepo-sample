import { createReportsApi } from '@template/reports-feature'
import { environment } from './environment'

export const reportsApi = createReportsApi(environment.apiBaseUrl)
