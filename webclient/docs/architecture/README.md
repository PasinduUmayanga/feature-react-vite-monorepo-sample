# Architecture

## System overview

`webclient/` is a pnpm workspace containing two Vite applications and shared packages.

```text
apps/web     → public implementation tutorial
apps/admin   → authenticated administration workspace
packages/*   → shared UI, hooks, transport, and feature domains
```

Applications own routing, application composition, browser configuration, and presentation. Shared packages expose explicit public APIs and must not be imported through relative filesystem paths.

## Key decisions

- [ADR-001: Feature-owned server state](ADR-001-feature-owned-server-state.md)
- [ADR-002: Application-owned environment configuration](ADR-002-application-owned-environment-configuration.md)
