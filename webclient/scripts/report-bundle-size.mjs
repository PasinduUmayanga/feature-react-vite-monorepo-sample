import { readdir, readFile } from 'node:fs/promises'
import { brotliCompressSync, gzipSync } from 'node:zlib'
import { join, relative } from 'node:path'

const applications = ['apps/web', 'apps/admin']

async function readAssets(application) {
  const assetDirectory = join(application, 'dist', 'assets')
  const assets = await readdir(assetDirectory)
  const rows = await Promise.all(assets
    .filter((file) => /\.(?:js|css)$/.test(file))
    .map(async (file) => {
      const content = await readFile(join(assetDirectory, file))
      return {
        file: relative('.', join(assetDirectory, file)),
        bytes: content.length,
        gzipBytes: gzipSync(content).length,
        brotliBytes: brotliCompressSync(content).length,
      }
    }))

  return rows.sort((left, right) => right.bytes - left.bytes)
}

function formatKilobytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} kB`
}

for (const application of applications) {
  const assets = await readAssets(application)
  const totals = assets.reduce(
    (total, asset) => ({
      bytes: total.bytes + asset.bytes,
      gzipBytes: total.gzipBytes + asset.gzipBytes,
      brotliBytes: total.brotliBytes + asset.brotliBytes,
    }),
    { bytes: 0, gzipBytes: 0, brotliBytes: 0 },
  )

  console.log(`\n${application}`)
  for (const asset of assets) {
    console.log(`  ${asset.file}: ${formatKilobytes(asset.bytes)} raw, ${formatKilobytes(asset.gzipBytes)} gzip, ${formatKilobytes(asset.brotliBytes)} brotli`)
  }
  console.log(`  total: ${formatKilobytes(totals.bytes)} raw, ${formatKilobytes(totals.gzipBytes)} gzip, ${formatKilobytes(totals.brotliBytes)} brotli`)
}
