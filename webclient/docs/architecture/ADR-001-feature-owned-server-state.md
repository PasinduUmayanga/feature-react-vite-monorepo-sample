# ADR-001: Feature-owned server state

## Status

Accepted.

## Decision

Each domain owns its types, API adapter, query keys, and TanStack Query hooks under `packages/features/<domain>/`. Applications consume those public hooks and retain only transient UI state such as open panels, filters, and selected views.

## Consequences

- Query behavior and cache keys remain consistent across applications.
- Shared HTTP transport remains framework-neutral in `packages/api-client`.
- Admin-specific presentation stays in `apps/admin` rather than leaking into domain packages.
