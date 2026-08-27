# ADR-002: Application-owned environment configuration

## Status

Accepted.

## Decision

Vite environment values are read and validated at each application boundary. The Admin app validates `VITE_API_BASE_URL` in `apps/admin/src/config/environment.ts`, then passes that public configuration to feature API factories.

## Consequences

- Reusable packages do not depend on `import.meta.env` or Vite.
- `.env` remains ignored; `.env.example` documents the configuration contract.
- `VITE_*` values are treated as public browser configuration and must never contain secrets.
