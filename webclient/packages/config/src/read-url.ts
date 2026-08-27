export function readRequiredUrl(value: string | undefined, name: string) {
  if (!value) throw new Error(`${name} must be configured.`)
  let url: URL
  try { url = new URL(value) } catch { throw new Error(`${name} must be a valid absolute URL.`) }
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error(`${name} must use HTTP or HTTPS.`)
  return url.toString().replace(/\/$/, '')
}
