import { useEffect, useState } from 'react'
import { Button, Checkbox, RadioButton, TextField } from '@template/ui'
import { TutorialStepHeading } from '../components/molecules/TutorialStepHeading'
import { TutorialFlow } from '../components/organisms/TutorialFlow'
import { HooksPlayground } from '../components/organisms/HooksPlayground'
import { TutorialPageTemplate } from '../templates/TutorialPageTemplate'
import { ApplicationsTutorialPage } from './tutorials/ApplicationsTutorialPage'
import { AtomicDesignTutorialPage } from './tutorials/AtomicDesignTutorialPage'
import { FeatureQueriesTutorialPage } from './tutorials/FeatureQueriesTutorialPage'
import { SetupTutorialPage } from './tutorials/SetupTutorialPage'
import { SharedUiTutorialPage } from './tutorials/SharedUiTutorialPage'
import { HooksTutorialPage } from './tutorials/HooksTutorialPage'

type AppKind = 'web' | 'admin'
type TutorialId = 'setup' | 'applications' | 'atomic-design' | 'shared-ui' | 'hooks' | 'feature-queries'

const tutorialSections = [
  { id: 'setup', label: 'Initialize', detail: 'Workspace root' },
  { id: 'applications', label: 'Applications', detail: 'Web and Admin apps' },
  { id: 'atomic-design', label: 'Atomic Design', detail: 'Application UI layers' },
  { id: 'shared-ui', label: 'Shared UI', detail: 'Reusable components' },
  { id: 'hooks', label: 'Hooks', detail: 'State, callbacks, and effects' },
  { id: 'feature-queries', label: 'Feature queries', detail: 'Server state and reports' },
] as const satisfies readonly { id: TutorialId; label: string; detail: string }[]

function readTutorialId(): TutorialId {
  const id = window.location.hash.replace('#/tutorials/', '')
  return tutorialSections.some((section) => section.id === id) ? id as TutorialId : 'setup'
}

const appGuides = {
  web: {
    label: 'Web project',
    packageName: '@template/web',
    folder: 'apps/web',
    createCommand: 'pnpm create vite apps/web --template react-ts',
    runCommand: 'pnpm --filter @template/web dev',
    purpose: 'Public-facing React application served by Vite.',
  },
  admin: {
    label: 'Admin project',
    packageName: '@template/admin',
    folder: 'apps/admin',
    createCommand: 'pnpm create vite apps/admin --template react-ts',
    runCommand: 'pnpm --filter @template/admin dev',
    purpose: 'Administration application with its own routes and deployment.',
  },
} as const

const workspaceConfig = `packages:
  - apps/*
  - packages/*
  - packages/features/*`

const atomicFolderStructure = `apps/admin/src/            # same pattern for apps/web/src
├── components/
│   ├── atoms/            # smallest UI elements
│   │   ├── ActionButton.tsx
│   │   └── StatusBadge.tsx
│   ├── molecules/        # combinations of atoms
│   │   └── UserActions.tsx
│   └── organisms/        # complete page sections
│       └── UserTable.tsx
├── templates/            # page layout, no domain state
│   └── UserManagementTemplate.tsx
├── pages/                # state and user operations
│   └── UserManagementPage.tsx
├── services/             # browser storage and app integrations
├── styles/               # feature styles
└── App.tsx               # application orchestration`

const atomicCompositionCode = `// pages/UserManagementPage.tsx
import { useState } from 'react'
import { UserManagementTemplate } from '../templates/UserManagementTemplate'

export function UserManagementPage() {
  const [users, setUsers] = useState([])

  return (
    <UserManagementTemplate
      users={users}
      onDelete={(id) => setUsers((current) =>
        current.filter((user) => user.id !== id)
      )}
    />
  )
}`

const installSharedUi = `pnpm --filter @template/web add "@template/ui@workspace:*"
pnpm --filter @template/admin add "@template/ui@workspace:*"
pnpm install`

const packageJsonUpdates = `// apps/web/package.json
{
  "name": "@template/web",
  "dependencies": {
    "@template/ui": "workspace:*"
  }
}

// apps/admin/package.json
{
  "name": "@template/admin",
  "dependencies": {
    "@template/ui": "workspace:*"
  }
}`

const textFieldCode = `// packages/ui/src/TextField.tsx
import type { InputHTMLAttributes } from 'react'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  hint?: string
}

export function TextField({ label, hint, ...props }: TextFieldProps) {
  return (
    <label>
      <span>{label}</span>
      <input type="text" {...props} />
      {hint ? <small>{hint}</small> : null}
    </label>
  )
}
`

const radioButtonCode = `// packages/ui/src/RadioButton.tsx
import type { InputHTMLAttributes } from 'react'

export type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function RadioButton({ label, ...props }: RadioButtonProps) {
  return <label><input type="radio" {...props} /> {label}</label>
}
`

const checkboxCode = `// packages/ui/src/Checkbox.tsx
import type { InputHTMLAttributes } from 'react'

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return <label><input type="checkbox" {...props} /> {label}</label>
}
`

const barrelExportCode = `// packages/ui/src/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
export { Checkbox } from './Checkbox'
export type { CheckboxProps } from './Checkbox'
export { RadioButton } from './RadioButton'
export type { RadioButtonProps } from './RadioButton'
export { TextField } from './TextField'
export type { TextFieldProps } from './TextField'`

const componentFiles = [
  { label: 'TextField.tsx', code: textFieldCode },
  { label: 'RadioButton.tsx', code: radioButtonCode },
  { label: 'Checkbox.tsx', code: checkboxCode },
] as const

const sharedButtonCode = `import { Button, Checkbox, RadioButton, TextField } from '@template/ui'

export function Example() {
  return (
    <form>
      <TextField id="name" name="name" label="Project name" />
      <RadioButton name="app" value="web" label="Web app" />
      <RadioButton name="app" value="admin" label="Admin app" />
      <Checkbox name="typescript" label="Use TypeScript" />
      <Button type="submit">Create project</Button>
    </form>
  )
}`

const counterHookCode = `// packages/hooks/src/useCounter.ts
import { useCallback, useState } from 'react'

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount((current) => current + 1), [])
  const decrement = useCallback(() => setCount((current) => current - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return { count, increment, decrement, reset }
}`

const effectHookCode = `// apps/web/src/components/organisms/HooksPlayground.tsx
import { useCounter, useDocumentTitle } from '@template/hooks'

const { count, decrement, increment, reset } = useCounter()
useDocumentTitle(\`${'${count}'} clicks — Kepler Web\`)`

const architectureTree = `webclient/
├── apps/
│   ├── web/                         # tutorial and public experience
│   └── admin/                       # QueryClient + admin presentation
│       ├── .env                     # ignored, public local configuration
│       ├── .env.example             # committed configuration contract
│       └── src/config/environment.ts
└── packages/
    ├── api-client/                  # request transport and errors
    │   └── src/http-client.ts
    ├── hooks/                       # shared React hooks
    └── features/
        ├── reports/                 # report aggregation and query hooks
        └── users/                   # user domain owns server state
            └── src/
                ├── api/users-client.ts
                ├── queries/user-keys.ts
                ├── queries/use-users.ts
                └── queries/use-user-mutations.ts`

const httpClientCode = `// packages/api-client/src/http-client.ts
export function createHttpClient({ baseUrl, getAccessToken }: HttpClientOptions) {
  async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const headers = new Headers(options.headers)
    const token = getAccessToken?.()

    if (options.body !== undefined) headers.set('Content-Type', 'application/json')
    if (token) headers.set('Authorization', \`Bearer \${token}\`)

    const response = await fetch(new URL(path, baseUrl), {
      ...options,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    })

    const payload: unknown = await response.json().catch(() => null)
    if (!response.ok) throw new HttpError('Request failed.', response.status, payload)
    return payload as T
  }

  return { request }
}`

const environmentCode = `# apps/admin/.env.example
# Public browser configuration only. Never add secrets, tokens, or credentials.
VITE_API_BASE_URL=https://dummyjson.com

// apps/admin/src/config/environment.ts
function readApiBaseUrl(value: string | undefined) {
  if (!value) throw new Error('VITE_API_BASE_URL must be configured.')

  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('VITE_API_BASE_URL must use HTTP or HTTPS.')
  }

  return url.toString().replace(/\\/$/, '')
}

export const environment = {
  apiBaseUrl: readApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
}`

const queryKeysCode = `// packages/features/users/src/queries/user-keys.ts
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
}

// packages/features/users/src/queries/use-users.ts
export function useUsers(usersApi: UsersApi) {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: usersApi.getUsers,
    staleTime: 60_000,
  })
}`

const mutationCode = `// packages/features/users/src/queries/use-user-mutations.ts
export function useCreateUser(usersApi: UsersApi) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: (createdUser) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (users = []) =>
        [createdUser, ...users]
      )
    },
  })
}`

const reportsCode = `// packages/features/reports/src/api/reports-client.ts
// Demo note: role and status values reflect the mapped users adapter.
// Replace this aggregation when the reporting API provides those fields.
export function createReportsApi(baseUrl: string) {
  const usersApi = createUsersApi(baseUrl)

  async function getUserReport(): Promise<UserReport> {
    const users = await usersApi.getUsers()

    return {
      generatedAt: new Date().toISOString(),
      totalUsers: users.length,
      usersByStatus: countBy(users.map((user) => user.status), statuses),
      usersByRole: countBy(users.map((user) => user.role), roles),
      recentUsers: newestFirst(users).slice(0, 5),
    }
  }

  return { getUserReport }
}

// packages/features/reports/src/queries/use-user-report.ts
export function useUserReport(reportsApi: ReportsApi) {
  return useQuery({
    queryKey: reportKeys.userSummary(),
    queryFn: reportsApi.getUserReport,
    staleTime: 60_000,
  })
}`

const providerCode = `// apps/admin/src/main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)`

const pageUsageCode = `// apps/admin/src/pages/UserManagementPage.tsx
const usersQuery = useUsers(usersApi)
const createUser = useCreateUser(usersApi)
const [panel, setPanel] = useState<PanelState | null>(null)

async function handleSave(draft: UserDraft) {
  await createUser.mutateAsync(draft)
  setPanel(null)
}

return (
  <UserManagementTemplate
    users={usersQuery.data ?? []}
    isLoading={usersQuery.isLoading}
    errorMessage={usersQuery.isError ? 'Unable to load users.' : null}
    onSave={handleSave}
  />
)`

export function MonorepoTutorialPage() {
  const [activeApp, setActiveApp] = useState<AppKind>('web')
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTutorial, setActiveTutorial] = useState<TutorialId>(readTutorialId)
  const guide = appGuides[activeApp]

  useEffect(() => {
    function syncTutorial() {
      setActiveTutorial(readTutorialId())
      window.scrollTo({ top: 0 })
    }

    window.addEventListener('hashchange', syncTutorial)
    return () => window.removeEventListener('hashchange', syncTutorial)
  }, [])

  async function copyCommand(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      window.setTimeout(() => setCopied(null), 1600)
    } catch {
      setCopied('Copy unavailable')
    }
  }

  return (
    <TutorialPageTemplate>
      <nav className="topbar" aria-label="Project navigation">
        <a className="wordmark" href="#top">Kepler <span>Web</span></a>
        <a href="#/tutorials/feature-queries">Feature queries</a>
      </nav>

      <nav className="tutorial-toc" aria-label="Tutorial table of contents">
        <span className="tutorial-toc__eyebrow">In this guide</span>
        <ol>
          {tutorialSections.map((section, index) => (
            <li key={section.id}>
              <a href={`#/tutorials/${section.id}`} aria-current={activeTutorial === section.id ? 'page' : undefined}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{section.label}</strong>
                <small>{section.detail}</small>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="hero" id="top">
        <div className="hero__copy">
          <span className="eyebrow">pnpm · React · Vite</span>
          <h1>From <code>pnpm init</code> to two focused apps.</h1>
          <p>Follow the structure used by this repository to create independent Web and Admin applications that consume one shared component package.</p>
          <div className="hero__actions">
            <Button onClick={() => { window.location.hash = '/tutorials/setup' }}>Start the guide</Button>
            <a href="https://pnpm.io/workspaces" target="_blank" rel="noreferrer">pnpm workspace docs</a>
          </div>
        </div>
        <div className="tree-card" aria-label="Monorepo folder structure">
          <span>webclient/</span>
          <div>├─ apps/</div>
          <div className="tree-card__accent">│&nbsp; ├─ web/</div>
          <div className="tree-card__accent">│&nbsp; └─ admin/</div>
          <div>└─ packages/</div>
          <div className="tree-card__shared">&nbsp;&nbsp; ├─ api-client/</div>
          <div className="tree-card__shared">&nbsp;&nbsp; ├─ features/users/</div>
          <div className="tree-card__shared">&nbsp;&nbsp; └─ ui/</div>
        </div>
      </section>

      {activeTutorial === 'setup' && <SetupTutorialPage>
        <header className="section-heading">
          <span>01 · Initialize</span>
          <h2>Create the workspace root</h2>
          <p>Run these once from an empty frontend directory.</p>
        </header>
        <div className="setup-grid">
          <article className="code-card">
            <div className="code-card__header"><span>PowerShell</span><button type="button" onClick={() => copyCommand('init', 'pnpm init')}>{copied === 'init' ? 'Copied' : 'Copy'}</button></div>
            <pre><code>pnpm init</code></pre>
          </article>
          <article className="code-card">
            <div className="code-card__header"><span>pnpm-workspace.yaml</span><button type="button" onClick={() => copyCommand('workspace', workspaceConfig)}>{copied === 'workspace' ? 'Copied' : 'Copy'}</button></div>
            <pre><code>{workspaceConfig}</code></pre>
          </article>
        </div>
      </SetupTutorialPage>}

      {activeTutorial === 'applications' && <ApplicationsTutorialPage>
        <header className="section-heading">
          <span>02 · Create applications</span>
          <h2>Choose a project</h2>
          <p>Each app is independently runnable but follows the same workspace conventions.</p>
        </header>

        <div className="project-tabs" role="tablist" aria-label="Application setup examples">
          {(Object.keys(appGuides) as AppKind[]).map((kind) => (
            <Button
              key={kind}
              role="tab"
              aria-selected={activeApp === kind}
              onClick={() => setActiveApp(kind)}
              style={activeApp === kind ? undefined : { color: '#c8d2df', background: '#1a2130', boxShadow: 'none' }}
            >
              {appGuides[kind].label}
            </Button>
          ))}
        </div>

        <article className="project-card" role="tabpanel">
          <div className="project-card__meta">
            <span>{guide.folder}</span>
            <strong>{guide.packageName}</strong>
          </div>
          <h3>{guide.label}</h3>
          <p>{guide.purpose}</p>
          <ol>
            <li><span>Create</span><code>{guide.createCommand}</code><button type="button" onClick={() => copyCommand('create', guide.createCommand)}>{copied === 'create' ? 'Copied' : 'Copy'}</button></li>
            <li><span>Name</span><code>"name": "{guide.packageName}"</code></li>
            <li><span>Share</span><code>"@template/ui": "workspace:*"</code></li>
            <li><span>Run</span><code>{guide.runCommand}</code><button type="button" onClick={() => copyCommand('run', guide.runCommand)}>{copied === 'run' ? 'Copied' : 'Copy'}</button></li>
          </ol>
        </article>
      </ApplicationsTutorialPage>}

      {activeTutorial === 'atomic-design' && <AtomicDesignTutorialPage>
        <header className="section-heading">
          <span>03 · Atomic Design</span>
          <h2>Build from small parts to complete pages</h2>
          <p>Both applications place visual building blocks under <code>components/</code>. Dependencies flow upward: atoms → molecules → organisms → templates → pages. Server state belongs in feature packages.</p>
        </header>
        <div className="atomic-layout">
          <article className="code-card code-card--large">
            <div className="code-card__header"><span>Application folder structure</span><button type="button" onClick={() => copyCommand('atomic-tree', atomicFolderStructure)}>{copied === 'atomic-tree' ? 'Copied' : 'Copy'}</button></div>
            <pre><code>{atomicFolderStructure}</code></pre>
          </article>
          <div className="atomic-layers" aria-label="Atomic Design layer responsibilities">
            <article><strong>components/atoms</strong><span>Button, badge, input</span></article>
            <article><strong>components/molecules</strong><span>Search field, user actions</span></article>
            <article><strong>components/organisms</strong><span>Login panel, user table</span></article>
            <article><strong>templates</strong><span>Arranges sections and layout</span></article>
            <article><strong>pages</strong><span>Owns state, loading and operations</span></article>
          </div>
        </div>
        <article className="code-card atomic-example">
          <div className="code-card__header"><span>Page composes a template</span><button type="button" onClick={() => copyCommand('atomic-example', atomicCompositionCode)}>{copied === 'atomic-example' ? 'Copied' : 'Copy'}</button></div>
          <pre><code>{atomicCompositionCode}</code></pre>
        </article>
        <p className="atomic-rule"><strong>Rule:</strong> lower layers never import pages or templates. Shared, domain-neutral primitives belong in <code>@template/ui</code>.</p>
      </AtomicDesignTutorialPage>}

      {activeTutorial === 'shared-ui' && <SharedUiTutorialPage>
        <header className="section-heading">
          <span className="eyebrow">04 · Reuse</span>
          <h2>Create once, share with both apps.</h2>
          <p>Complete these steps in order from the <code>webclient/</code> workspace root.</p>
        </header>

        <TutorialFlow>
          <section className="tutorial-step">
            <TutorialStepHeading step="1" title="Create separate component files">Place reusable, domain-neutral components in <code>packages/ui/src/</code>. Keep each component and its prop type together.</TutorialStepHeading>
            <div className="component-file-grid">
              {componentFiles.map((file) => (
                <article className="code-card code-card--large" key={file.label}>
                  <div className="code-card__header"><span>{file.label}</span><button type="button" onClick={() => copyCommand(file.label, file.code)}>{copied === file.label ? 'Copied' : 'Copy'}</button></div>
                  <pre><code>{file.code}</code></pre>
                </article>
              ))}
            </div>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="2" title="Export the public API">Applications import from <code>@template/ui</code>, never from the package's private source paths.</TutorialStepHeading>
            <article className="code-card">
              <div className="code-card__header"><span>packages/ui/src/index.ts</span><button type="button" onClick={() => copyCommand('barrel-export', barrelExportCode)}>{copied === 'barrel-export' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{barrelExportCode}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="3" title="Install the workspace package">Run these commands once to link the shared package to both applications and update the lockfile.</TutorialStepHeading>
            <article className="code-card">
              <div className="code-card__header"><span>PowerShell · webclient/</span><button type="button" onClick={() => copyCommand('install-ui', installSharedUi)}>{copied === 'install-ui' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{installSharedUi}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="4" title="Confirm both package manifests">The pnpm commands add the local package with the <code>workspace:*</code> protocol.</TutorialStepHeading>
            <article className="code-card">
              <div className="code-card__header"><span>apps/web + apps/admin</span><button type="button" onClick={() => copyCommand('package-json', packageJsonUpdates)}>{copied === 'package-json' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{packageJsonUpdates}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="5" title="Import and use in either app">Use this same import in <code>apps/web/src/App.tsx</code> or <code>apps/admin/src/App.tsx</code>.</TutorialStepHeading>
            <article className="code-card code-card--large">
              <div className="code-card__header"><span>App.tsx</span><button type="button" onClick={() => copyCommand('component', sharedButtonCode)}>{copied === 'component' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{sharedButtonCode}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="6" title="See the shared components working">This form is rendered by the real components exported from <code>@template/ui</code>.</TutorialStepHeading>
            <form className="live-form" onSubmit={(event) => event.preventDefault()}>
              <TextField id="sample-project" name="project" label="Project name" hint="Rendered from @template/ui" placeholder="customer-portal" />
              <fieldset>
                <legend>Application</legend>
                <RadioButton name="sample-app" value="web" label="Web app" defaultChecked />
                <RadioButton name="sample-app" value="admin" label="Admin app" />
              </fieldset>
              <Checkbox name="sample-typescript" label="Use TypeScript" defaultChecked />
              <Button type="submit" onClick={() => setCopied('sample')}>{copied === 'sample' ? 'Project ready' : 'Create project'}</Button>
            </form>
          </section>
        </TutorialFlow>
      </SharedUiTutorialPage>}

      {activeTutorial === 'hooks' && <HooksTutorialPage>
        <header className="section-heading">
          <span>05 · React Hooks</span>
          <h2>Learn hooks with a real interaction.</h2>
          <p>Keep reusable state logic in a custom hook, and use effects only when synchronizing React with an external system.</p>
        </header>
        <TutorialFlow>
          <section className="tutorial-step">
            <TutorialStepHeading step="1" title="Extract reusable state with useState">The shared counter hook owns its state and exposes small actions. <code>useCallback</code> keeps each action stable when a consumer needs a stable function reference.</TutorialStepHeading>
            <article className="code-card code-card--large">
              <div className="code-card__header"><span>packages/hooks/src/useCounter.ts</span><button type="button" onClick={() => copyCommand('counter-hook', counterHookCode)}>{copied === 'counter-hook' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{counterHookCode}</code></pre>
            </article>
          </section>
          <section className="tutorial-step">
            <TutorialStepHeading step="2" title="Use an effect hook for an external system"><code>useDocumentTitle</code> wraps the effect that synchronizes the browser tab title and restores it when the consumer unmounts. Both Web and Admin use this shared hook.</TutorialStepHeading>
            <article className="code-card">
              <div className="code-card__header"><span>HooksPlayground.tsx</span><button type="button" onClick={() => copyCommand('effect-hook', effectHookCode)}>{copied === 'effect-hook' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{effectHookCode}</code></pre>
            </article>
          </section>
          <section className="tutorial-step">
            <TutorialStepHeading step="3" title="Try the hook">Use the controls below, then check the browser tab title. Reset returns the hook to its initial value.</TutorialStepHeading>
            <HooksPlayground />
          </section>
        </TutorialFlow>
      </HooksTutorialPage>}

      {activeTutorial === 'feature-queries' && <FeatureQueriesTutorialPage>
        <header className="section-heading">
          <span>06 · Server state</span>
          <h2>Keep APIs and queries with the domain.</h2>
          <p>These are the same package boundaries and TanStack Query patterns used by the admin user directory in this repository.</p>
        </header>
        <p className="tutorial-source-rule"><strong>Source-of-truth rule:</strong> every snippet in this guide identifies the real file it documents and is updated alongside meaningful changes to the monorepo.</p>

        <TutorialFlow>
          <section className="tutorial-step">
            <TutorialStepHeading step="1" title="Create a shared HTTP boundary">The API client owns transport, parsing, normalized errors, and optional access-token injection. It has no React or browser-storage dependency.</TutorialStepHeading>
            <article className="code-card code-card--large">
              <div className="code-card__header"><span>packages/api-client/src/http-client.ts</span><button type="button" onClick={() => copyCommand('http-client', httpClientCode)}>{copied === 'http-client' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{httpClientCode}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="2" title="Keep public URLs in application configuration">The ignored local <code>.env</code> holds the clean API URL. Its committed example is the deployment contract; the application validates it before sharing it with feature API factories.</TutorialStepHeading>
            <article className="code-card code-card--large">
              <div className="code-card__header"><span>apps/admin/.env.example + src/config/environment.ts</span><button type="button" onClick={() => copyCommand('environment', environmentCode)}>{copied === 'environment' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{environmentCode}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="3" title="Give each feature its own public API">The users feature exports domain types, API operations, query keys, and hooks. Apps import <code>@template/users-feature</code> instead of reaching into another app.</TutorialStepHeading>
            <article className="code-card code-card--large">
              <div className="code-card__header"><span>Feature package layout</span><button type="button" onClick={() => copyCommand('architecture-tree', architectureTree)}>{copied === 'architecture-tree' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{architectureTree}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="4" title="Centralize cache keys and reads">Query keys live beside the queries, so invalidation and cache updates cannot drift between screens.</TutorialStepHeading>
            <article className="code-card">
              <div className="code-card__header"><span>users query key + hook</span><button type="button" onClick={() => copyCommand('query-keys', queryKeysCode)}>{copied === 'query-keys' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{queryKeysCode}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="5" title="Let mutations own cache changes">A create, update, or delete hook updates the relevant query cache. Pages stay focused on user interactions rather than cache plumbing.</TutorialStepHeading>
            <article className="code-card">
              <div className="code-card__header"><span>create-user mutation</span><button type="button" onClick={() => copyCommand('mutation', mutationCode)}>{copied === 'mutation' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{mutationCode}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="6" title="Build derived reports as their own feature">The reports feature reuses the users feature's public API to aggregate report data. Its demo role and status metrics reflect the mapped users adapter; a reporting service can replace this adapter without changing the admin page.</TutorialStepHeading>
            <article className="code-card code-card--large">
              <div className="code-card__header"><span>packages/features/reports</span><button type="button" onClick={() => copyCommand('reports', reportsCode)}>{copied === 'reports' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{reportsCode}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="7" title="Mount one Query client per application">Caching policy is application-owned, so the admin app supplies its own provider at the React root.</TutorialStepHeading>
            <article className="code-card">
              <div className="code-card__header"><span>apps/admin/src/main.tsx</span><button type="button" onClick={() => copyCommand('provider', providerCode)}>{copied === 'provider' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{providerCode}</code></pre>
            </article>
          </section>

          <section className="tutorial-step">
            <TutorialStepHeading step="8" title="Keep pages responsible for UI state">The page owns the editor panel and presentation decisions. The feature hooks own remote data, loading state, and mutations.</TutorialStepHeading>
            <article className="code-card code-card--large">
              <div className="code-card__header"><span>apps/admin/src/pages/UserManagementPage.tsx</span><button type="button" onClick={() => copyCommand('page-usage', pageUsageCode)}>{copied === 'page-usage' ? 'Copied' : 'Copy'}</button></div>
              <pre><code>{pageUsageCode}</code></pre>
            </article>
          </section>
        </TutorialFlow>
        <p className="atomic-rule"><strong>Working rule:</strong> UI-only state stays in the app; API contracts, query keys, and server-state hooks stay in the owning feature package. Replace the DummyJSON adapter in <code>@template/users-feature</code> when a production users API is ready.</p>
      </FeatureQueriesTutorialPage>}
    </TutorialPageTemplate>
  )
}
