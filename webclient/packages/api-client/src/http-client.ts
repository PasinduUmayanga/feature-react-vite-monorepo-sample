import { HttpError, NetworkError } from './errors'

export interface HttpClientOptions {
  baseUrl: string
  getAccessToken?: () => string | null | undefined
}

export interface RequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
  body?: unknown
  headers?: HeadersInit
}

function joinUrl(baseUrl: string, path: string) {
  return new URL(path, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).toString()
}

function responseMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string') return payload.message
  return fallback
}

export function createHttpClient({ baseUrl, getAccessToken }: HttpClientOptions) {
  async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const token = getAccessToken?.()
    const headers = new Headers(options.headers)
    if (options.body !== undefined) headers.set('Content-Type', 'application/json')
    if (token) headers.set('Authorization', `Bearer ${token}`)

    let response: Response
    try {
      response = await fetch(joinUrl(baseUrl, path), {
        ...options,
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
      })
    } catch {
      throw new NetworkError()
    }

    const payload: unknown = await response.json().catch(() => null)
    if (!response.ok) throw new HttpError(responseMessage(payload, `Request failed with status ${response.status}.`), response.status, payload)
    return payload as T
  }

  return { request }
}
