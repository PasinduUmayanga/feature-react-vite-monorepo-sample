import { Button } from '@template/ui'

export function App() {
  return (
    <main className="page-shell">
      <section className="hero">
        <span className="eyebrow">React · Vite · Workspaces</span>
        <h1>A clean monorepo, ready for your next idea.</h1>
        <p>
          Build applications in <code>apps</code>, share components from <code>packages</code>,
          and manage everything with one npm install.
        </p>
        <Button onClick={() => window.open('https://vite.dev/guide/', '_blank')}>
          Explore Vite
        </Button>
      </section>
    </main>
  )
}
