# Development Guide

This directory is the frontend root: a React and Vite monorepo managed with pnpm workspaces. The repository-level `../AGENTS.md` defines the top-level project boundary. Instructions in a more deeply nested `AGENTS.md` override this file for that directory.

## Repository layout

- `apps/web`: browser application built with React, TypeScript, and Vite.
- `apps/admin`: administration application built with React, TypeScript, and Vite.
- `packages/ui`: shared React components consumed by workspace applications.
- `packages/api-client`: shared, framework-neutral HTTP transport and error handling.
- `packages/features/*`: feature-owned domain types, API operations, query keys, and TanStack Query hooks.
- `pnpm-workspace.yaml`: workspace discovery and dependency build policy.
- `tsconfig.json`: root TypeScript project references.

## Tooling

- Use Node.js 24.19.0. Keep `.nvmrc`, `.node-version`, `package.json`, AppVeyor, and the README aligned when changing the runtime.
- Use the pnpm version declared in `webclient/package.json` through Corepack.
- Run `corepack enable` once if `pnpm` is unavailable.
- Run pnpm commands from the `webclient/` directory unless a command explicitly targets a workspace.
- Do not add npm or Yarn lockfiles. `pnpm-lock.yaml` is the only dependency lockfile.
- Use `workspace:*` for dependencies between packages in this repository.

## Common commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm preview
pnpm clean
```

Target one workspace when appropriate:

```bash
pnpm --filter @template/web <command>
pnpm --filter @template/admin <command>
pnpm --filter @template/ui <command>
```

## Development conventions

- Keep TypeScript strict and avoid `any`; model unknown external data with `unknown` and narrow it.
- Prefer named exports for components, utilities, and types.
- Keep application-only code in `apps/` and reusable code in `packages/`.
- Keep server-state access in feature packages. Applications may own presentation and transient UI state, but must consume feature hooks rather than call APIs directly.
- Keep the HTTP client framework-neutral. Authentication/session storage remains at the application boundary and supplies tokens only when needed.
- Do not import another workspace through relative filesystem paths. Add it as a workspace dependency and import its public package API.
- Keep package entry points explicit and export only supported public APIs.
- Preserve the existing formatting style: single quotes, trailing commas, and no semicolons in TypeScript.
- Never edit generated files in `dist/` or dependency files in `node_modules/`.
- Update the README and relevant `AGENTS.md` when commands, structure, or architectural conventions change.
- Keep the public Web tutorial aligned with meaningful implementation changes. When a change affects architecture, package boundaries, APIs, tooling, developer workflow, or user-visible feature behavior, update `apps/web/src/pages/MonorepoTutorialPage.tsx` with accurate, copyable code and the relevant file paths. Every tutorial lesson has its own hash route; maintain those routes and the table of contents whenever its section structure changes. Routine internal refactors, dependency patch updates, and isolated styling fixes do not need a tutorial update unless they change the lesson or behavior.

## Adding a workspace

1. Create it below `apps/` or `packages/` with a unique scoped package name.
2. Add its scripts and TypeScript configuration.
3. Add a reference to `webclient/tsconfig.json` when it participates in workspace type-checking.
4. Add or update scripts in `webclient/package.json` only when the new workspace must be part of the default workflow.
5. Run `pnpm install` to update `pnpm-lock.yaml`.

## Verification

For code or configuration changes, run at minimum:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Also exercise the affected feature in the development server when behavior or styling changes. Do not consider work complete while relevant checks fail; report any check that cannot be run.
