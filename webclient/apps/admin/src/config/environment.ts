function readApiBaseUrl(value: string | undefined) {
  if (!value) throw new Error('VITE_API_BASE_URL must be configured.')

  let url: URL
  try {
    url = new URL(value)
  } catch {
    throw new Error('VITE_API_BASE_URL must be a valid absolute URL.')
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('VITE_API_BASE_URL must use HTTP or HTTPS.')
  }

  return url.toString().replace(/\/$/, '')
}

export const environment = {
  apiBaseUrl: readApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
}
