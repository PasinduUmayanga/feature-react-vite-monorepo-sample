# Kepler Web

Kepler Web is the public, code-first tutorial for this React, Vite, and pnpm monorepo. It explains the workspace structure using implementation-faithful snippets and interactive examples.

## Run locally

Run commands from `webclient/`:

```powershell
pnpm --filter @template/web dev
```

The app runs on [http://localhost:5173](http://localhost:5173).

## Tutorial routes

Each lesson has a direct hash route, which remains compatible with static hosting:

- `#/tutorials/setup`
- `#/tutorials/applications`
- `#/tutorials/atomic-design`
- `#/tutorials/shared-ui`
- `#/tutorials/hooks`
- `#/tutorials/feature-queries`

The Hooks lesson includes sub-routes for `useState`, `useEffect`, `useMemo`, `useRef`, and `useCallback`, for example `#/tutorials/hooks?hook=ref`.

## Boundaries

- Lesson shells live in `src/pages/tutorials/`; `MonorepoTutorialPage.tsx` owns tutorial navigation and shared examples.
- App-specific presentation belongs under `src/components/`, `src/pages/`, and `src/templates/`.
- Domain-neutral hooks come from `@template/hooks`; reusable UI comes from `@template/ui`.
- Keep all examples copyable and synchronized with the real code they explain.

## Verify

```powershell
pnpm --filter @template/web typecheck
pnpm --filter @template/web build
```

For visual changes, also inspect the tutorial at desktop and narrow mobile widths.
