import { HttpError, NetworkError, createHttpClient } from '@template/api-client'
import { clearSession, readSession, storeSession, type StoredSessionOptions } from '@template/auth'
import { environment } from '../config/environment'

const SESSION_KEY = 'kepler-admin-session'
const client = createHttpClient({ baseUrl: environment.apiBaseUrl })

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
  try {
    const payload = await client.request<unknown>('/auth/login', {
      method: 'POST',
      body: { username, password, expiresInMins: 30 },
      credentials: 'include',
    })
    if (!isAdminSession(payload)) throw new AuthenticationError('The login service returned an unexpected response.')
    return payload
  } catch (error) {
    if (error instanceof HttpError) throw new AuthenticationError(error.message)
    if (error instanceof NetworkError) {
      throw new AuthenticationError('Unable to reach the login service. Check your connection and try again.')
    }
    if (error instanceof AuthenticationError) throw error
    throw new AuthenticationError('Unable to reach the login service. Check your connection and try again.')
  }
}

const sessionOptions: StoredSessionOptions<AdminSession> = {
  key: SESSION_KEY,
  isSession: isAdminSession,
}

export function storeAdminSession(session: AdminSession, remember: boolean) {
  storeSession(sessionOptions, session, remember)
}

export function readAdminSession(): AdminSession | null {
  return readSession(sessionOptions)
}

export function clearAdminSession() {
  clearSession(sessionOptions)
}
