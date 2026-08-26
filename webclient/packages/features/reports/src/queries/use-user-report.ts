import { useQuery } from '@tanstack/react-query'
import type { ReportsApi } from '../api/reports-client'
import { reportKeys } from './report-keys'

export function useUserReport(reportsApi: ReportsApi) {
  return useQuery({ queryKey: reportKeys.userSummary(), queryFn: reportsApi.getUserReport, staleTime: 60_000 })
}
