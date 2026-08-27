# DummyJSON Demo Integration

The current Admin prototype uses DummyJSON through the public URL supplied by `VITE_API_BASE_URL`.

## Authentication

`apps/admin/src/services/dummyJsonAuth.ts` calls `POST /auth/login` and stores the returned demo session in browser storage. This is a prototype convenience, not a production authorization model.

## Users and reports

`@template/users-feature` reads users through `GET /users?limit=100` and demonstrates create, update, and delete operations. DummyJSON mutations are simulated and do not persist after reload.

`@template/reports-feature` aggregates mapped user data. Role and status report metrics are demo-only because DummyJSON does not provide this application's actual role or status contract.

## Replacement path

When a production API is available, replace the feature adapter implementation while preserving each feature package's public types and query hooks. Update this document, the relevant ADRs, and the Web tutorial in the same change.
