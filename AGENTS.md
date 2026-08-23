# Development Guide

This repository is a React and Vite monorepo managed with pnpm workspaces. Instructions in a more deeply nested `AGENTS.md` override this file for that directory.

## Repository layout

- `apps/web`: browser application built with React, TypeScript, and Vite.
- `packages/ui`: shared React components consumed by workspace applications.
- `pnpm-workspace.yaml`: workspace discovery and dependency build policy.
- `tsconfig.json`: root TypeScript project references.

## Tooling

- Use Node.js 20.19 or newer.
- Use the pnpm version declared in the root `package.json` through Corepack.
- Run `corepack enable` once if `pnpm` is unavailable.
- Run commands from the repository root unless a command explicitly targets a workspace.
- Do not add npm or Yarn lockfiles. `pnpm-lock.yaml` is the only dependency lockfile.
- Use `workspace:*` for dependencies between packages in this repository.

## Common commands

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
pnpm clean
```

Target one workspace when appropriate:

```bash
pnpm --filter @template/web <command>
pnpm --filter @template/ui <command>
```

## Development conventions

- Keep TypeScript strict and avoid `any`; model unknown external data with `unknown` and narrow it.
- Prefer named exports for components, utilities, and types.
- Keep application-only code in `apps/` and reusable code in `packages/`.
- Do not import another workspace through relative filesystem paths. Add it as a workspace dependency and import its public package API.
- Keep package entry points explicit and export only supported public APIs.
- Preserve the existing formatting style: single quotes, trailing commas, and no semicolons in TypeScript.
- Never edit generated files in `dist/` or dependency files in `node_modules/`.
- Update the README and relevant `AGENTS.md` when commands, structure, or architectural conventions change.

## Adding a workspace

1. Create it below `apps/` or `packages/` with a unique scoped package name.
2. Add its scripts and TypeScript configuration.
3. Add a root TypeScript project reference when it participates in repository type-checking.
4. Add or update root scripts only when the new workspace must be part of the default workflow.
5. Run `pnpm install` to update `pnpm-lock.yaml`.

## Verification

For code or configuration changes, run at minimum:

```bash
pnpm typecheck
pnpm build
```

Also exercise the affected feature in the development server when behavior or styling changes. Do not consider work complete while relevant checks fail; report any check that cannot be run.
