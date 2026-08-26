# Admin Application Guide

These instructions apply to `apps/admin` and extend the repository-level development guide.

## Purpose and boundaries

- This workspace owns authenticated administration experiences, operational dashboards, and management workflows.
- Keep authorization checks enforced by the backing service; client-side route guards improve navigation but are not a security boundary.
- Keep admin-only presentation and workflow code here. Shared domain types, API operations, query keys, and TanStack Query hooks belong in `packages/features/*`; move only genuinely reusable, domain-neutral components into `packages/ui`.
- Consume shared code through package imports such as `@template/ui`, never through relative paths into another workspace.

## React conventions

- Use function components and named exports.
- Organize growing features by domain, colocating components, data access, types, styles, and tests.
- Represent loading, empty, error, success, and permission-denied states explicitly.
- Confirm destructive actions and clearly communicate whether they can be reversed.
- Use semantic HTML, label every control, support keyboard workflows, and preserve visible focus states.
- Do not expose secrets, privileged tokens, or sensitive user data through browser code or logs.

## Atomic Design structure

- Use `src/components/atoms`, `src/components/molecules`, `src/components/organisms`, `src/templates`, and `src/pages`, matching the Web application; do not add a `src/features` wrapper.
- Keep transient page state in pages, browser-storage integration in `src/services`, and feature styles in `src/styles`. Import shared domain models and server-state hooks from their feature package rather than creating app-local copies.
- Atoms remain small and presentation-focused. Molecules combine atoms, organisms compose complete sections, and templates arrange organisms without owning domain state.
- Pages own feature state and operations. `App.tsx` handles only application-level session and page selection.
- Dependencies flow upward through the Atomic Design layers; lower layers must not import templates or pages.

## Styling and environment

- Keep global tokens and reset rules in `src/styles.css`; colocate feature styles as the app grows.
- Maintain usable navigation and tables on narrow screens.
- Only variables prefixed with `VITE_` are exposed to browser code, so never store secrets in them. Keep public service URLs in the ignored `.env` file and document them in the committed `.env.example`.
- Validate environment values at the application boundary before passing configuration to shared packages. Document required variables in a committed `.env.example` without real credentials.

## Verification

From the `webclient/` directory, run:

```bash
pnpm --filter @template/admin typecheck
pnpm --filter @template/admin build
```

For behavioral or visual changes, also run `pnpm dev:admin` and inspect affected states in a browser.
