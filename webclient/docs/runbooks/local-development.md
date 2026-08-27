# Local Development

Run all commands from `webclient/`.

```powershell
pnpm install
Copy-Item apps/admin/.env.example apps/admin/.env
pnpm dev
```

Start the Admin app separately when needed:

```powershell
pnpm dev:admin
```

Validate the complete workspace before handing work over:

```powershell
pnpm lint
pnpm typecheck
pnpm build
```

The Web app is available on port `5173`; Admin is available on port `5174`.
