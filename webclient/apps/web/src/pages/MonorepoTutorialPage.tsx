import { useState } from 'react'
import { Button, Checkbox, RadioButton, TextField } from '@template/ui'
import { TutorialStepHeading } from '../components/molecules/TutorialStepHeading'
import { TutorialFlow } from '../components/organisms/TutorialFlow'
import { TutorialPageTemplate } from '../templates/TutorialPageTemplate'

type AppKind = 'web' | 'admin'

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
  - packages/*`

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
├── services/             # APIs and browser storage
├── data/                 # mock or seed data
├── types/                # domain models
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

export function MonorepoTutorialPage() {
  const [activeApp, setActiveApp] = useState<AppKind>('web')
  const [copied, setCopied] = useState<string | null>(null)
  const guide = appGuides[activeApp]

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
        <a className="wordmark" href="#top">Kepler <span>Template</span></a>
        <a href="#shared-ui">Shared UI</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero__copy">
          <span className="eyebrow">pnpm · React · Vite</span>
          <h1>From <code>pnpm init</code> to two focused apps.</h1>
          <p>Follow the structure used by this repository to create independent Web and Admin applications that consume one shared component package.</p>
          <div className="hero__actions">
            <Button onClick={() => document.querySelector('#setup')?.scrollIntoView({ behavior: 'smooth' })}>Start the guide</Button>
            <a href="https://pnpm.io/workspaces" target="_blank" rel="noreferrer">pnpm workspace docs</a>
          </div>
        </div>
        <div className="tree-card" aria-label="Monorepo folder structure">
          <span>webclient/</span>
          <div>├─ apps/</div>
          <div className="tree-card__accent">│&nbsp; ├─ web/</div>
          <div className="tree-card__accent">│&nbsp; └─ admin/</div>
          <div>└─ packages/</div>
          <div className="tree-card__shared">&nbsp;&nbsp; └─ ui/</div>
        </div>
      </section>

      <section className="setup-section" id="setup">
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
      </section>

      <section className="project-section">
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
      </section>

      <section className="atomic-section" id="atomic-design">
        <header className="section-heading">
          <span>03 · Atomic Design</span>
          <h2>Build from small parts to complete pages</h2>
          <p>Both applications place visual building blocks under <code>components/</code>. Dependencies flow upward: atoms → molecules → organisms → templates → pages.</p>
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
      </section>

      <section className="shared-section" id="shared-ui">
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
      </section>
    </TutorialPageTemplate>
  )
}
