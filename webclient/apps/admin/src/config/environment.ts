import { readRequiredUrl } from '@template/config'

export const environment = {
  apiBaseUrl: readRequiredUrl(import.meta.env.VITE_API_BASE_URL, 'VITE_API_BASE_URL'),
}
