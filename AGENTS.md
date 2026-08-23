# Repository Guide

The frontend project lives entirely under `webclient/`. Read `webclient/AGENTS.md` before changing frontend source, dependencies, tooling, or documentation; more deeply nested `AGENTS.md` files add workspace-specific instructions.

## Top-level layout

- `webclient/`: React, Vite, TypeScript, and pnpm monorepo.
- `appveyor.yml`: Windows CI configuration for validating and building the frontend.
- `.gitignore`: repository-wide ignore rules, including generated frontend output.
- `.agents/`: repository-level agent metadata; do not treat it as application source.

## Working directory

Run frontend package-manager and build commands from `webclient/`, not from the repository root:

```bash
cd webclient
pnpm install
pnpm typecheck
pnpm build
```

Do not create frontend package manifests, lockfiles, applications, or shared packages at the repository root. Place them within the existing `webclient/` workspace structure.

## Repository changes

- Keep repository-level files at the top level only when they apply beyond the frontend workspace.
- Preserve `.git`, `.gitignore`, and `.agents/` when reorganizing `webclient/`.
- Keep AppVeyor commands rooted in `webclient/` and use the package-manager version declared there.
- Update both this file and `webclient/AGENTS.md` if the top-level project boundary changes.
