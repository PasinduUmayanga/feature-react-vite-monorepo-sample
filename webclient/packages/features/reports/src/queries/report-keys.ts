export const reportKeys = {
  all: ['reports'] as const,
  userSummary: () => [...reportKeys.all, 'users', 'summary'] as const,
}
