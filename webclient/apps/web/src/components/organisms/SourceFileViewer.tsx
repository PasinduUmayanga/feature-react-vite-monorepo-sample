import { useEffect, useState } from 'react'
import { sourceFiles } from '../../tutorials/sourceFiles'

interface SourceFileViewerProps {
  path: string
  description: string
  onClose: () => void
}

export function SourceFileViewer({ path, description, onClose }: Readonly<SourceFileViewerProps>) {
  const [copied, setCopied] = useState(false)
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const load = sourceFiles[path]
    if (load) void load().then((value) => { if (active) setCode(value) })
    return () => { active = false }
  }, [path])

  async function copyCode() {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return <aside className="source-file-viewer" aria-label={`Source for ${path}`}><header><div><code>{path}</code><p>{description}</p></div><button type="button" onClick={onClose} aria-label="Close source code">×</button></header>{code ? <><button className="source-file-viewer__copy" type="button" onClick={() => void copyCode()}>{copied ? 'Copied' : 'Copy complete file'}</button><pre><code>{code}</code></pre></> : sourceFiles[path] ? <p className="source-file-viewer__missing">Loading source code…</p> : <p className="source-file-viewer__missing">This file is documented here but is not a browser source file.</p>}</aside>
}
