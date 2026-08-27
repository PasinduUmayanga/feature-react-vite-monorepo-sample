# Production Configuration

Configure `VITE_API_BASE_URL` in the Admin deployment environment with the intended public HTTPS API base URL.

Do not place credentials, tokens, private keys, or privileged service URLs in Vite environment variables. Browser variables are bundled into client output and are publicly visible.

Before deployment, run:

```powershell
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
```

The existing GitHub Actions workflow deploys Web and Admin as separate Vercel projects. See the workspace README for the required Vercel secrets and project configuration.
