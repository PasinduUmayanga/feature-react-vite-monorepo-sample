import { useMemo } from 'react'
import { Button } from '@template/ui'
import { useCounter, useDocumentTitle, useFocusOnMount } from '@template/hooks'

export function HooksPlayground() {
  const { count, decrement, increment, reset } = useCounter()
  const resetButtonRef = useFocusOnMount<HTMLButtonElement>()
  const parity = useMemo(() => count % 2 === 0 ? 'Even' : 'Odd', [count])

  useDocumentTitle(`${count} clicks — Kepler Web`)

  return (
    <section className="hooks-playground" aria-labelledby="hooks-playground-title">
      <div><span>Live hook result</span><h3 id="hooks-playground-title">{count}</h3><p>{parity} value · the Reset control receives focus on mount.</p><p>The browser title updates while this lesson is open.</p></div>
      <div className="hooks-playground__actions">
        <Button onClick={decrement}>Decrease</Button>
        <Button onClick={increment}>Increase</Button>
        <button ref={resetButtonRef} type="button" onClick={reset}>Reset</button>
      </div>
    </section>
  )
}
