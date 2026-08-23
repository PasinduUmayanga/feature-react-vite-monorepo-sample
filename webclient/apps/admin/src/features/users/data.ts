import type { User } from './types'

export const initialUsers: User[] = [
  { id: 'usr-001', name: 'Maya Fernando', email: 'maya@example.com', role: 'Administrator', status: 'Active', createdAt: '2026-07-18' },
  { id: 'usr-002', name: 'Nimal Perera', email: 'nimal@example.com', role: 'Manager', status: 'Active', createdAt: '2026-07-29' },
  { id: 'usr-003', name: 'Ayesha Silva', email: 'ayesha@example.com', role: 'Viewer', status: 'Invited', createdAt: '2026-08-12' },
  { id: 'usr-004', name: 'Ravi Jayasinghe', email: 'ravi@example.com', role: 'Viewer', status: 'Suspended', createdAt: '2026-08-16' },
]
