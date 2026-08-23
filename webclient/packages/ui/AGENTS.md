# Shared UI Package Guide

These instructions apply to `packages/ui` and extend the repository-level development guide.

## Package contract

- This package contains reusable, domain-neutral React UI components.
- Treat exports from `src/index.ts` as the public API. Consumers must not import private source modules directly.
- Export component prop types alongside their components.
- Keep React in `peerDependencies`; do not bundle or add a separate runtime React copy.
- Avoid dependencies on application workspaces, routing, global application state, or application-specific CSS.

## Component conventions

- Use semantic elements and preserve native HTML attributes by extending the appropriate React attribute type.
- Support caller-provided `className`, `style`, event handlers, ARIA attributes, and refs when the underlying element reasonably requires them.
- Prefer composable props and children over large sets of narrowly tailored boolean variants.
- Provide sensible accessible behavior by default, including focus visibility and disabled states.
- Avoid hard-coded application copy, URLs, analytics, or product-specific colors.
- Keep barrel exports intentional; remove exports only as an explicit breaking change.

## TypeScript and builds

- Keep declaration generation working for all public exports.
- Do not hand-edit the generated `dist/` directory.
- When adding dependencies, distinguish runtime dependencies from peer and development dependencies correctly.

## Verification

From the `webclient/` directory, run:

```bash
pnpm --filter @template/ui typecheck
pnpm --filter @template/ui build
pnpm --filter @template/web build
pnpm --filter @template/admin build
```

The application builds verify that the package remains consumable through its public workspace import in both clients.
