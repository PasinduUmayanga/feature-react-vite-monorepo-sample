export interface StoredSessionOptions<TSession> {
  key: string
  isSession: (value: unknown) => value is TSession
}

export function storeSession<TSession>(options: StoredSessionOptions<TSession>, session: TSession, remember: boolean) {
  clearSession(options)
  const storage = remember ? window.localStorage : window.sessionStorage
  storage.setItem(options.key, JSON.stringify(session))
}

export function readSession<TSession>(options: StoredSessionOptions<TSession>): TSession | null {
  for (const storage of [window.localStorage, window.sessionStorage]) {
    const value = storage.getItem(options.key)
    if (!value) continue
    try {
      const session: unknown = JSON.parse(value)
      if (options.isSession(session)) return session
    } catch {
      storage.removeItem(options.key)
    }
  }
  return null
}

export function clearSession<TSession>({ key }: StoredSessionOptions<TSession>) {
  window.localStorage.removeItem(key)
  window.sessionStorage.removeItem(key)
}
