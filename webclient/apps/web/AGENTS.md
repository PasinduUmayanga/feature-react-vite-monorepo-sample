# Web Application Guide

These instructions apply to `apps/web` and extend the repository-level development guide.

## Purpose and boundaries

- This workspace owns routing, pages, application state, browser integration, and app-specific styles.
- Move a component to `packages/ui` only when it is genuinely reusable and does not depend on application state or app-specific domain concepts.
- Consume shared code through package imports such as `@template/ui`, never through `../../packages/...` paths.
- `src/pages/MonorepoTutorialPage.tsx` is the public implementation tutorial shell for this monorepo. Keep it limited to routing and layout; each maintained application, package, feature, configuration, or documentation area has its own lesson page under `src/pages/tutorials/`, plus a corresponding typed folder-menu entry in `src/tutorials/tutorialMenu.ts`. Keep their implementation-faithful examples and hash routes synchronized with meaningful architecture, workflow, API, package, and user-visible feature changes.

## React conventions

- Use function components and named exports.
- Keep components small and colocate app-specific helpers, styles, and tests with the feature that owns them.
- Prefer derived values during rendering over duplicated state.
- Use effects only to synchronize with external systems; keep effect dependencies complete.
- Keep the application accessible: use semantic HTML, label controls, support keyboard interaction, and preserve visible focus states.
- Avoid unnecessary memoization. Add it only for a measured problem or a stable-reference requirement.
- Tutorial snippets must identify the real source file they explain and remain copyable. Use implementation-faithful excerpts rather than aspirational pseudocode; explain the code's purpose and ordering alongside it.

## Atomic Design structure

- Organize application UI as `components/atoms`, `components/molecules`, `components/organisms`, `templates`, and `pages`.
- Atoms are small presentation primitives. Molecules combine atoms into a focused control or heading.
- Organisms compose complete page sections. Templates own layout but not application state.
- Pages connect templates to application state and feature behavior. Keep `App.tsx` focused on app-level orchestration.
- Dependencies flow upward: molecules may use atoms, organisms may use molecules, templates arrange organisms, and pages compose templates. Do not import pages into lower layers.
- Keep genuinely cross-application, domain-neutral components in `@template/ui` instead of duplicating them in both app trees.

## Styling and assets

- Put global tokens and truly global rules in `src/styles.css`.
- Keep feature-specific styles close to their feature if the application grows beyond the starter layout.
- Place static public files in `public/` and imported source assets under `src/`.
- Ensure layouts remain usable from 320px-wide screens upward.

## Environment variables

- Only variables prefixed with `VITE_` are exposed to browser code.
- Never put secrets in client environment variables or commit local `.env` files.
- Document required variables in a committed `.env.example`.

## Verification

From the `webclient/` directory, run:

```bash
pnpm --filter @template/web typecheck
pnpm --filter @template/web build
```

For visual or interactive changes, also run `pnpm dev` and inspect the affected states in a browser.
