import type { UserStatus } from '@template/users-feature'

interface StatusBadgeProps {
  status: UserStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status.toLowerCase()}`}>{status}</span>
}
