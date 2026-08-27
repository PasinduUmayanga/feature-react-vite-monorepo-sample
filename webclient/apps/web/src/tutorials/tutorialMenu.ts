export const lessonIds = ['workspace', 'web-app', 'admin-app', 'atomic-design', 'shared-ui', 'hooks', 'utilities', 'api-client', 'auth', 'config', 'users-feature', 'reports-feature', 'eslint-config', 'environment', 'documentation'] as const

export type LessonId = typeof lessonIds[number]

export interface TutorialLesson {
  id: LessonId
  title: string
  path: string
  summary: string
  ownership: string
  code: string
}

export interface TutorialMenuFolder {
  label: string
  description?: string
  children: readonly TutorialMenuNode[]
}

export interface TutorialMenuFile {
  label: string
  description: string
}

export type TutorialMenuNode = TutorialMenuFolder | TutorialMenuFile | LessonId

export const tutorialMenu: readonly TutorialMenuFolder[] = [{
  label: 'webclient',
  description: 'pnpm workspace containing applications, reusable packages, and engineering guidance.',
  children: [
    'workspace',
    { label: 'apps', description: 'Independently deployed React applications.', children: [
      { label: 'web', description: 'Public architecture learning application.', children: [
        'web-app', { label: 'src', description: 'Web application source.', children: [
          { label: 'App.tsx', description: 'Sets the browser title and mounts the tutorial shell.' },
          { label: 'pages', description: 'Route-level lesson pages and the thin router shell.', children: ['atomic-design', { label: 'tutorials', description: 'One focused lesson component per architecture topic.', children: ['hooks', 'utilities'] }] },
          { label: 'components', description: 'Atomic Design UI for navigation, code, and live examples.', children: [{ label: 'organisms', description: 'ArchitectureMenu and HooksPlayground compose complete learning sections.', children: [] }] },
          { label: 'hooks', description: 'Browser-local tutorial progress hook.', children: [{ label: 'useLessonProgress.ts', description: 'Persists completed lesson IDs in local storage.' }] },
          { label: 'tutorials', description: 'Typed lesson content and repository navigation model.', children: [{ label: 'tutorialMenu.ts', description: 'Defines lesson routes, ownership text, code excerpts, and folder metadata.' }] },
        ] },
      ] },
      { label: 'admin', description: 'Operations application.', children: [
        'admin-app', { label: 'src', description: 'Admin application source.', children: ['atomic-design', { label: 'pages', description: 'User management and reports connect UI to feature hooks.', children: [] }, { label: 'config', description: 'Validates public environment configuration and creates API adapters.', children: ['environment'] }, { label: 'services', description: 'Owns browser-session integration.', children: [] }] },
      ] },
    ] },
    { label: 'packages', description: 'Reusable APIs consumed through workspace package names.', children: [
      { label: 'api-client', description: 'Framework-neutral HTTP transport.', children: ['api-client', { label: 'src', description: 'Public HTTP client and error implementation.', children: [{ label: 'http-client.ts', description: 'Builds requests, token headers, and normalized results.' }, { label: 'errors.ts', description: 'Defines HTTP and network error types.' }, { label: 'index.ts', description: 'Exports the supported API-client public API.' }] }] },
      { label: 'auth', description: 'Provider-neutral browser session persistence.', children: ['auth', { label: 'src', description: 'Typed session storage helpers.', children: [{ label: 'session-storage.ts', description: 'Reads, stores, validates, and clears browser sessions.' }, { label: 'index.ts', description: 'Exports the supported auth public API.' }] }] },
      { label: 'config', description: 'Framework-neutral configuration validation.', children: ['config', { label: 'src', description: 'Validation helpers consumed at app boundaries.', children: [{ label: 'read-url.ts', description: 'Validates required HTTP and HTTPS URLs.' }, { label: 'index.ts', description: 'Exports the supported config public API.' }] }] },
      { label: 'eslint-config', description: 'Shared workspace lint policy.', children: ['eslint-config', { label: 'index.mjs', description: 'Composes the reusable flat ESLint configuration.' }] },
      { label: 'hooks', description: 'Domain-neutral reusable React hooks.', children: ['hooks', { label: 'src', description: 'Reusable browser and state hooks.', children: [{ label: 'useCounter.ts', description: 'Provides a small stateful counter API.' }, { label: 'useDocumentTitle.ts', description: 'Synchronizes the browser tab title.' }, { label: 'useFocusOnMount.ts', description: 'Focuses an element after mounting.' }] }] },
      { label: 'ui', description: 'Cross-application domain-neutral controls.', children: ['shared-ui', { label: 'src', description: 'Reusable React component public API.', children: [{ label: 'index.ts', description: 'Exports supported UI controls and types.' }] }] },
      { label: 'utilities', description: 'Pure formatting and validation helpers.', children: ['utilities', { label: 'src', description: 'Framework-independent helper functions.', children: [{ label: 'formatDate.ts', description: 'Formats valid dates safely.' }, { label: 'formatName.ts', description: 'Formats display names.' }, { label: 'isValidEmail.ts', description: 'Validates email text.' }] }] },
      { label: 'features', description: 'Feature-owned server-state and domain boundaries.', children: [
        { label: 'users', description: 'User domain API, types, query keys, and hooks.', children: ['users-feature', { label: 'src', description: 'User feature source.', children: [{ label: 'api', description: 'Users API adapter.', children: [] }, { label: 'queries', description: 'Users query keys and mutation hooks.', children: [] }, { label: 'types', description: 'User domain models.', children: [] }] }] },
        { label: 'reports', description: 'User report aggregation and query state.', children: ['reports-feature', { label: 'src', description: 'Report feature source.', children: [{ label: 'api', description: 'Report API aggregation.', children: [] }, { label: 'queries', description: 'Report query hooks and keys.', children: [] }, { label: 'types', description: 'Report domain models.', children: [] }] }] },
      ] },
    ] },
    { label: 'docs', description: 'Versioned architecture and operating guidance.', children: ['documentation'] },
  ],
}]

export const tutorialLessons: Record<LessonId, TutorialLesson> = {
  workspace: { id: 'workspace', title: 'Workspace foundation', path: 'pnpm-workspace.yaml', summary: 'pnpm discovers both apps and reusable packages from one workspace root.', ownership: 'The root owns package discovery and dependency-aware scripts.', code: `packages:
  - apps/*
  - packages/*
  - packages/features/*` },
  'web-app': { id: 'web-app', title: 'Web learning application', path: 'apps/web/src/App.tsx', summary: 'The public Web app owns tutorial routing, browser state, and learning presentation.', ownership: 'App-only UI stays in apps/web; reusable UI and hooks stay in packages.', code: `import { useDocumentTitle } from '@template/hooks'
import { MonorepoTutorialPage } from './pages/MonorepoTutorialPage'

export function App() {
  useDocumentTitle('Kepler Web — Architecture Learning')
  return <MonorepoTutorialPage />
}` },
  'admin-app': { id: 'admin-app', title: 'Admin application', path: 'apps/admin/src/App.tsx', summary: 'Admin composes authenticated operational screens and defers them until needed.', ownership: 'The application owns session UI, page selection, and query-client policy.', code: `const UserManagementPage = lazy(async () => ({
  default: (await import('./pages/UserManagementPage')).UserManagementPage,
}))

const UserReportsPage = lazy(async () => ({
  default: (await import('./pages/UserReportsPage')).UserReportsPage,
}))` },
  'atomic-design': { id: 'atomic-design', title: 'Atomic Design', path: 'apps/admin/src', summary: 'Applications layer presentation from atoms through stateful pages.', ownership: 'Apps own UI layers; feature packages own domain server state.', code: `components/
├── atoms/       # presentation primitives
├── molecules/   # focused combinations
└── organisms/   # complete sections
templates/        # layout without domain state
pages/            # UI state and feature operations` },
  'shared-ui': { id: 'shared-ui', title: 'Shared UI package', path: 'packages/ui/src/index.ts', summary: 'Domain-neutral controls are consumed through an explicit package API.', ownership: '@template/ui owns reusable controls, never application workflows.', code: `export { Button } from './Button'
export type { ButtonProps } from './Button'
export { TextField } from './TextField'
export type { TextFieldProps } from './TextField'` },
  hooks: { id: 'hooks', title: 'Shared React hooks', path: 'packages/hooks/src/useCounter.ts', summary: 'Small hooks encapsulate reusable local-state and browser behavior.', ownership: '@template/hooks owns domain-neutral React behavior.', code: `export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increment = useCallback(() => setCount((current) => current + 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  return { count, increment, reset }
}` },
  utilities: { id: 'utilities', title: 'Utilities', path: 'packages/utilities/src/formatDate.ts', summary: 'Pure date, formatting, and validation helpers are shared without React.', ownership: '@template/utilities owns framework-neutral helpers only.', code: `export function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(date)
}` },
  'api-client': { id: 'api-client', title: 'HTTP client', path: 'packages/api-client/src/http-client.ts', summary: 'HTTP transport is reusable without coupling to React or environment storage.', ownership: '@template/api-client owns request mechanics and normalized errors.', code: `export function createHttpClient({ baseUrl, getAccessToken }: HttpClientOptions) {
  async function request<T>(path: string) {
    const token = getAccessToken?.()
    const response = await fetch(new URL(path, baseUrl))
    if (!response.ok) throw new HttpError('Request failed.', response.status)
    return response.json() as Promise<T>
  }
  return { request }
}` },
  auth: { id: 'auth', title: 'Authentication contracts', path: 'packages/auth/src/session-storage.ts', summary: 'Generic browser-session persistence is shared while provider-specific login requests remain in each app.', ownership: '@template/auth owns typed session storage, not credentials, secrets, or an identity-provider API.', code: `export function storeSession<TSession>(options: StoredSessionOptions<TSession>, session: TSession, remember: boolean) {
  clearSession(options)
  const storage = remember ? window.localStorage : window.sessionStorage
  storage.setItem(options.key, JSON.stringify(session))
}` },
  config: { id: 'config', title: 'Configuration validation', path: 'packages/config/src/read-url.ts', summary: 'Framework-neutral validation is shared, while applications read their own environment values.', ownership: '@template/config validates configuration values; apps remain responsible for import.meta.env and secrets.', code: `export function readRequiredUrl(value: string | undefined, name: string) {
  if (!value) throw new Error(\`${'${name}'} must be configured.\`)
  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error(\`${'${name}'} must use HTTP or HTTPS.\`)
  return url.toString().replace(/\\/$/, '')
}` },
  'users-feature': { id: 'users-feature', title: 'Users feature', path: 'packages/features/users/src/queries/use-users.ts', summary: 'Users owns its types, API adapter, query keys, and TanStack Query hooks.', ownership: '@template/users-feature owns user server state; apps own presentation state.', code: `export function useUsers(usersApi: UsersApi) {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: usersApi.getUsers,
    staleTime: 60_000,
  })
}` },
  'reports-feature': { id: 'reports-feature', title: 'Reports feature', path: 'packages/features/reports/src/api/reports-client.ts', summary: 'Reports derives a separate domain view using the public users API.', ownership: '@template/reports-feature owns report aggregation and report query state.', code: `export function createReportsApi(baseUrl: string) {
  const usersApi = createUsersApi(baseUrl)
  async function getUserReport(): Promise<UserReport> {
    const users = await usersApi.getUsers()
    return { generatedAt: new Date().toISOString(), totalUsers: users.length }
  }
  return { getUserReport }
}` },
  'eslint-config': { id: 'eslint-config', title: 'Shared lint configuration', path: 'packages/eslint-config/index.mjs', summary: 'A shared flat configuration applies consistent linting across the workspace.', ownership: '@template/eslint-config owns lint rules; the root applies them.', code: `export function createWorkspaceLintConfig() {
  return tseslint.config(
    { ignores: ['**/dist/**', '**/node_modules/**'] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
  )
}` },
  environment: { id: 'environment', title: 'Environment and production', path: 'apps/admin/src/config/environment.ts', summary: 'Public configuration is validated at the application boundary and build output is measured.', ownership: 'Applications parse Vite variables; deployment secrets stay outside browser code.', code: `const url = new URL(value)
if (!['http:', 'https:'].includes(url.protocol)) {
  throw new Error('VITE_API_BASE_URL must use HTTP or HTTPS.')
}

"bundle:report": "node scripts/report-bundle-size.mjs"` },
  documentation: { id: 'documentation', title: 'Engineering documentation', path: 'docs', summary: 'Architecture, API, and operational guidance is versioned with the code it describes.', ownership: 'docs owns durable cross-application guidance and runbooks.', code: `docs/
├── architecture/  # ADRs and system design notes
├── runbooks/      # operational procedures
└── api/           # API contracts and integration notes` },
}

export function isLessonId(value: string): value is LessonId {
  return lessonIds.some((id) => id === value)
}
