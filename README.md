# React + Vite Monorepo Template

A small, production-ready starting point for React applications built with Vite and pnpm workspaces.

## Structure

```text
apps/
  web/          React + Vite application
packages/
  ui/           Shared React component library
```

## Requirements

- Node.js 20.19+ or 22.12+
- pnpm 10+

## Getting started

```bash
corepack enable
pnpm install
pnpm dev
```

The development server runs at `http://localhost:5173`.

## Scripts

- `pnpm dev` starts the web application.
- `pnpm build` type-checks the shared package and builds the app.
- `pnpm typecheck` checks every workspace without emitting files.
- `pnpm preview` previews the production build.
- `pnpm clean` removes generated build output.

Add new applications under `apps/` and shared packages under `packages/`; pnpm discovers both through `pnpm-workspace.yaml`.
