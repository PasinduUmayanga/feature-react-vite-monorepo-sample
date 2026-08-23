const AUTH_URL = 'https://dummyjson.com/auth/login'
const SESSION_KEY = 'kepler-admin-session'

export interface AdminSession {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  accessToken: string
  refreshToken: string
}

export class AuthenticationError extends Error {}

function isAdminSession(value: unknown): value is AdminSession {
  if (!value || typeof value !== 'object') return false
  const session = value as Record<string, unknown>
  return typeof session.id === 'number'
    && typeof session.username === 'string'
    && typeof session.email === 'string'
    && typeof session.firstName === 'string'
    && typeof session.lastName === 'string'
    && typeof session.image === 'string'
    && typeof session.accessToken === 'string'
    && typeof session.refreshToken === 'string'
}

export async function authenticateAdmin(username: string, password: string): Promise<AdminSession> {
  let response: Response

  try {
    response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
      credentials: 'include',
    })
  } catch {
    throw new AuthenticationError('Unable to reach the login service. Check your connection and try again.')
  }

  const payload: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const message = payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string'
      ? payload.message
      : 'The username or password is incorrect.'
    throw new AuthenticationError(message)
  }

  if (!isAdminSession(payload)) {
    throw new AuthenticationError('The login service returned an unexpected response.')
  }

  return payload
}

export function storeAdminSession(session: AdminSession, remember: boolean) {
  clearAdminSession()
  const storage = remember ? localStorage : sessionStorage
  storage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function readAdminSession(): AdminSession | null {
  for (const storage of [localStorage, sessionStorage]) {
    const value = storage.getItem(SESSION_KEY)
    if (!value) continue

    try {
      const session: unknown = JSON.parse(value)
      if (isAdminSession(session)) return session
    } catch {
      storage.removeItem(SESSION_KEY)
    }
  }
  return null
}

export function clearAdminSession() {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}
