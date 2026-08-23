import { Button } from '@template/ui'

const metrics = [
  { label: 'Active users', value: '2,481', trend: '+12%' },
  { label: 'Open tasks', value: '34', trend: '-8%' },
  { label: 'System health', value: '99.9%', trend: 'Stable' },
]

export function App() {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Admin console home">Kepler</a>
        <nav aria-label="Admin navigation">
          <a className="active" href="#overview">Overview</a>
          <a href="#users">Users</a>
          <a href="#settings">Settings</a>
        </nav>
      </aside>

      <main>
        <header>
          <div>
            <span className="eyebrow">Admin console</span>
            <h1>Overview</h1>
          </div>
          <Button type="button">Create report</Button>
        </header>

        <section className="metrics" aria-label="Key metrics">
          {metrics.map((metric) => (
            <article className="metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.trend}</small>
            </article>
          ))}
        </section>

        <section className="activity">
          <h2>Recent activity</h2>
          <p>Your administration workspace is ready for features, routing, and data.</p>
        </section>
      </main>
    </div>
  )
}
