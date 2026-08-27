import { Button } from '@template/ui'
import { useCounter, useDocumentTitle } from '@template/hooks'

export function HooksPlayground() {
  const { count, decrement, increment, reset } = useCounter()

  useDocumentTitle(`${count} clicks — Kepler Web`)

  return (
    <section className="hooks-playground" aria-labelledby="hooks-playground-title">
      <div><span>Live hook result</span><h3 id="hooks-playground-title">{count}</h3><p>The browser title updates while this lesson is open.</p></div>
      <div className="hooks-playground__actions">
        <Button onClick={decrement}>Decrease</Button>
        <Button onClick={increment}>Increase</Button>
        <button type="button" onClick={reset}>Reset</button>
      </div>
    </section>
  )
}
