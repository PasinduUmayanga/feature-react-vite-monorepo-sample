const sourceModules = import.meta.glob([
  '../../../../packages/**/src/**/*.{ts,tsx}',
  '../../../../packages/eslint-config/index.mjs',
  '../**/*.{ts,tsx}',
  '../../**/*.{ts,tsx}',
], { query: '?raw', import: 'default' })

export const sourceFiles = Object.fromEntries(Object.entries(sourceModules).map(([path, load]) => {
  const marker = path.indexOf('packages/') >= 0 ? 'packages/' : 'apps/'
  return [path.slice(path.indexOf(marker)), load as () => Promise<string>]
})) as Record<string, () => Promise<string>>
