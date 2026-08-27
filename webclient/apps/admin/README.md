# Kepler Admin

Kepler Admin is the authenticated administration workspace for user management and user reports.

## Run locally

Run commands from `webclient/`:

```powershell
Copy-Item apps/admin/.env.example apps/admin/.env
pnpm --filter @template/admin dev
```

The app runs on [http://localhost:5174](http://localhost:5174).

## Configuration

`VITE_API_BASE_URL` is public browser configuration for the demo API. Keep it in the ignored `.env` file and never place secrets, tokens, or credentials in `VITE_*` variables.

The application validates this URL in `src/config/environment.ts` before configuring authentication and feature API factories.

## Demo access and data

The project uses DummyJSON for demonstration:

```text
Username: emilys
Password: emilyspass
```

User mutations are simulated by DummyJSON and do not persist after a reload. User Reports aggregate the mapped user data; role and status metrics are demo-only until a dedicated reporting service supplies those fields.

## Boundaries

- `src/pages/` owns view selection and transient UI state.
- `src/components/` and `src/templates/` own admin presentation.
- `@template/users-feature` and `@template/reports-feature` own server-state hooks and domain models.
- `@template/hooks` supplies shared React hooks, including document-title handling.

## Verify

```powershell
pnpm --filter @template/admin typecheck
pnpm --filter @template/admin build
```

For visual changes, verify login, user management, reports, and narrow-screen navigation.
