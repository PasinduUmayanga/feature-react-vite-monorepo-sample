export function formatDate(value: Date | string, options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }, locale = 'en') {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat(locale, options).format(date)
}
