# Production Build Performance

Both Vite applications target ES2022, emit content-hashed production assets, split CSS, and do not publish source maps. This matches the workspace TypeScript target and modern evergreen-browser support. Reassess the target before introducing legacy-browser support.

Admin pages are loaded with React `lazy` after authentication. Keep new infrequently visited routes behind a route-level dynamic import; do not split small components solely to create more chunks.

Build the workspace with dependency-aware concurrent package builds, then inspect compressed output:

```powershell
pnpm build
pnpm bundle:report
```

`bundle:report` prints raw, gzip, and Brotli sizes for emitted JavaScript and CSS. It deliberately performs compression outside Vite's normal build so routine local and CI builds do not spend time calculating compressed size twice.

Investigate a material increase in the entry or total compressed size before deployment. Add manual vendor chunks only when the report and browser waterfall demonstrate a caching benefit; broad vendor chunks can make route loading slower.

Source maps remain disabled in public output. If production error monitoring requires them, generate hidden maps in a separate monitoring upload step and ensure they are never served to browsers.
