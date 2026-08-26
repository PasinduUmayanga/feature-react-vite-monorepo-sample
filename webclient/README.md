# React + Vite Monorepo

[![Build status](https://ci.appveyor.com/api/projects/status/17uy8a50u77cv2u7/branch/main?svg=true)](https://ci.appveyor.com/project/Mahadenamuththa/feature-react-vite-monorepo-sample/branch/main)
[![Build History](https://img.shields.io/badge/AppVeyor-Build%20History-blue?logo=appveyor)](https://ci.appveyor.com/project/Mahadenamuththa/feature-react-vite-monorepo-sample/history)
[![Vercel Deployments](https://github.com/PasinduUmayanga/feature-react-vite-monorepo-sample/actions/workflows/vercel.yml/badge.svg?branch=main)](https://github.com/PasinduUmayanga/feature-react-vite-monorepo-sample/actions/workflows/vercel.yml)
[![Web on Vercel](https://img.shields.io/badge/Vercel-Web-000000?logo=vercel)](https://feature-react-vite-monorepo-sample-theta.vercel.app/)
[![Admin on Vercel](https://img.shields.io/badge/Vercel-Admin-000000?logo=vercel)](https://feature-react-vite-monorepo-sample.vercel.app/)
![Node.js](https://img.shields.io/badge/Node.js-24.19.0-339933?logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.15-F69220?logo=pnpm&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)
[![Last commit](https://img.shields.io/github/last-commit/PasinduUmayanga/feature-react-vite-monorepo-sample)](https://github.com/PasinduUmayanga/feature-react-vite-monorepo-sample/commits/main)
[![License](https://img.shields.io/github/license/PasinduUmayanga/feature-react-vite-monorepo-sample)](https://github.com/PasinduUmayanga/feature-react-vite-monorepo-sample/blob/main/LICENSE)

This folder contains two React applications and shared packages, managed as a pnpm workspace.

## Live Demo

- [Public web application](https://feature-react-vite-monorepo-sample-theta.vercel.app/)
- [Admin application](https://feature-react-vite-monorepo-sample.vercel.app/)

The admin application uses [DummyJSON authentication](https://dummyjson.com/docs/auth) for demonstration:

```text
Username: emilys
Password: emilyspass
```

This is a public fake account and API intended for prototypes. It is not a production authentication or authorization system.

## Project structure

```text
webclient/
├─ apps/
│  ├─ web/       Public web application
│  └─ admin/     Administration application
├─ packages/
│  ├─ api-client/       Framework-neutral HTTP transport and errors
│  ├─ features/users/   User API operations, query keys, and TanStack Query hooks
│  └─ ui/               Components shared by web and admin
├─ package.json
├─ pnpm-lock.yaml
└─ pnpm-workspace.yaml
```

Run all commands in this README from the `webclient` directory.

## 1. Install Node.js

Install Node.js `24.19.0`. The required version is pinned in both `.nvmrc` and `.node-version`, and `package.json` accepts Node 24 beginning with this release.

### Option A: Install Node.js directly

Download and install Node.js `24.19.0` from [nodejs.org](https://nodejs.org/). Close and reopen PowerShell after installation.

### Option B: Use NVM for Windows

If you use [NVM for Windows](https://github.com/coreybutler/nvm-windows), install and activate the pinned Node version:

```powershell
nvm install 24.19.0
nvm use 24.19.0
```

Verify that Node and npm are available:

```powershell
node --version
npm --version
```

`node --version` must print `v24.19.0` before continuing.

## 2. Enable pnpm with Corepack

Corepack installs and selects the pnpm version declared in `package.json`. This project currently pins pnpm `10.15.0`. Some Node.js 24 distributions include Corepack, but minimal and CI installations may require installing it separately.

First check whether Corepack is available:

```powershell
corepack --version
```

If PowerShell reports that `corepack` is not recognized, install the project-tested Corepack version:

```powershell
npm install --global corepack@0.35.0
```

Enable the package-manager command shims:

```powershell
corepack enable
```

Then verify pnpm:

```powershell
pnpm --version
```

The output should be `10.15.0`. If PowerShell still reports that `pnpm` is not recognized, close PowerShell, open a new window, and run the commands again:

```powershell
corepack enable
pnpm --version
```

When using NVM for Windows, switching Node versions may require running `corepack enable` again.

## 3. Open the frontend directory

From the repository root:

```powershell
cd webclient
```

If your terminal is already inside `webclient`, do not run this command again.

## 4. Install dependencies

Install all application and shared-package dependencies with one command:

```powershell
pnpm install
```

Do not use `npm install` or `yarn`. The repository uses `pnpm-lock.yaml` as its only dependency lockfile.

For repeatable CI installations that must not modify the lockfile, use:

```powershell
pnpm install --frozen-lockfile --store-dir .pnpm-store
```

## 5. Run the applications separately

Each application runs independently. Open a separate terminal for each application you want to run, and ensure each terminal is inside `webclient`.

### Run the public web application

```powershell
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

The explicit workspace command is equivalent:

```powershell
pnpm --filter @template/web dev
```

### Run the admin application

```powershell
pnpm dev:admin
```

Open [http://localhost:5174](http://localhost:5174).

The explicit workspace command is equivalent:

```powershell
pnpm --filter @template/admin dev
```

### Run both applications

Use two PowerShell windows:

Terminal 1:

```powershell
cd webclient
pnpm dev
```

Terminal 2:

```powershell
cd webclient
pnpm dev:admin
```

Stop a development server with `Ctrl+C` in its terminal.

## Build and verify

Type-check every workspace:

```powershell
pnpm typecheck
```

Build the shared UI package and both applications:

```powershell
pnpm build
```

Build only one application:

```powershell
pnpm --filter @template/web build
pnpm --filter @template/admin build
```

The production output is generated in each application's `dist` directory.

## Preview production builds

Build the projects first with `pnpm build`, then preview either application:

```powershell
# Public web application
pnpm preview

# Admin application
pnpm preview:admin
```

Run the preview commands in separate terminals if both previews are needed simultaneously.

## Add dependencies

Add a dependency only to the application that uses it:

```powershell
pnpm --filter @template/web add <package-name>
pnpm --filter @template/admin add <package-name>
```

Add a development dependency to a specific workspace:

```powershell
pnpm --filter @template/web add -D <package-name>
```

Add tooling to the workspace root:

```powershell
pnpm add -Dw <package-name>
```

Internal workspace dependencies must use the `workspace:*` protocol. Both applications already consume the shared UI package as `@template/ui`.

## Data-access architecture

Server state belongs to a feature package, not individual screens. The admin app mounts a TanStack Query provider and consumes `@template/users-feature` hooks for its user directory. `@template/api-client` owns request transport and normalized network/HTTP errors, while application code owns session storage and UI-only state such as open panels and search terms.

The current user directory is backed by DummyJSON for demonstration. DummyJSON simulates write operations without persisting them, so successful create, update, and delete operations update the TanStack Query cache for the current browser session. Replace the feature package's API adapter when a production users service is available.

## Keeping the public tutorial current

The Web application is also the repository's public, code-first tutorial. When a change affects the architecture, package boundaries, APIs, tooling, developer workflow, or a meaningful user-facing feature, update the tutorial in `apps/web/src/pages/MonorepoTutorialPage.tsx` in the same change. Each tutorial example should name the real source file it represents and contain copyable implementation-faithful code. Routine internal refactors, dependency patch updates, and isolated styling fixes do not need tutorial updates unless they change documented behavior.

## Other commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the public web app |
| `pnpm dev:admin` | Start the admin app |
| `pnpm lint` | Lint TypeScript, React Hooks, React Refresh, and accessibility rules |
| `pnpm lint:fix` | Apply safe automatic ESLint fixes |
| `pnpm typecheck` | Type-check all workspaces |
| `pnpm build` | Build the UI package and both apps |
| `pnpm preview` | Preview the public web production build |
| `pnpm preview:admin` | Preview the admin production build |
| `pnpm clean` | Remove generated workspace build output |

## AppVeyor CI

The repository-root `appveyor.yml` runs the frontend build on the Visual Studio 2022 worker image with Node.js 24.19.0. Because AppVeyor's Node package omits Corepack, CI installs the pinned pnpm 10.15.0 release directly through npm. It then runs pnpm through the Windows command shell. Each step resolves `webclient` from AppVeyor's absolute checkout directory so working-directory changes cannot produce a nested `webclient/webclient` path. AppVeyor then performs the following commands from `webclient`:

```powershell
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
```

Successful builds publish two ZIP artifacts:

- `web` from `apps/web/dist`
- `admin` from `apps/admin/dist`

AppVeyor caches `webclient/.pnpm-store` and invalidates that cache whenever `pnpm-lock.yaml` changes. The dependency links are still recreated on every build from the frozen lockfile.

Keep `appveyor.yml` at the repository root because AppVeyor discovers its build configuration there.

## Vercel deployments through GitHub Actions

The repository-root `.github/workflows/vercel.yml` validates the complete monorepo and deploys the web and admin applications as separate Vercel projects.

- Pull requests from this repository create preview deployments.
- Pushes to `main` create production deployments.
- Manual runs create previews unless the `production` input is enabled.
- Pull requests from forks are validated but do not deploy because repository secrets are unavailable.

Configure these encrypted GitHub Actions secrets before running the deployment jobs:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_WEB_PROJECT_ID
VERCEL_ADMIN_PROJECT_ID
```

Create two Vercel projects with root directories `webclient/apps/web` and `webclient/apps/admin`. Both projects must allow build access to source files outside their root directory so they can consume `webclient/packages/ui`. If Vercel's built-in Git deployments are enabled for these projects, disable them to avoid duplicate deployments alongside GitHub Actions.

## Troubleshooting

### `pnpm` is not recognized

```powershell
npm install --global corepack@0.35.0
corepack enable
pnpm --version
```

If it remains unavailable, reopen PowerShell. Confirm that Node is active with `node --version`. NVM users should run `nvm use <version>` before `corepack enable`.

### A development port is already in use

Stop the existing process with `Ctrl+C` in the terminal where it is running. The default ports are `5173` for web and `5174` for admin.

### Dependencies or workspace links are missing

Run this from `webclient`:

```powershell
pnpm install
```

### Clean generated output

```powershell
pnpm clean
```

Then reinstall or rebuild as needed.

## License

This project is available under the [MIT License](../LICENSE).
