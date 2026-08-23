# Admin Application Guide

These instructions apply to `apps/admin` and extend the repository-level development guide.

## Purpose and boundaries

- This workspace owns authenticated administration experiences, operational dashboards, and management workflows.
- Keep authorization checks enforced by the backing service; client-side route guards improve navigation but are not a security boundary.
- Keep admin-only domain code here. Move only genuinely reusable, domain-neutral components into `packages/ui`.
- Consume shared code through package imports such as `@template/ui`, never through relative paths into another workspace.

## React conventions

- Use function components and named exports.
- Organize growing features by domain, colocating components, data access, types, styles, and tests.
- Represent loading, empty, error, success, and permission-denied states explicitly.
- Confirm destructive actions and clearly communicate whether they can be reversed.
- Use semantic HTML, label every control, support keyboard workflows, and preserve visible focus states.
- Do not expose secrets, privileged tokens, or sensitive user data through browser code or logs.

## Styling and environment

- Keep global tokens and reset rules in `src/styles.css`; colocate feature styles as the app grows.
- Maintain usable navigation and tables on narrow screens.
- Only variables prefixed with `VITE_` are exposed to browser code, so never store secrets in them.
- Document required variables in a committed `.env.example` without real credentials.

## Verification

From the `webclient/` directory, run:

```bash
pnpm --filter @template/admin typecheck
pnpm --filter @template/admin build
```

For behavioral or visual changes, also run `pnpm dev:admin` and inspect affected states in a browser.
