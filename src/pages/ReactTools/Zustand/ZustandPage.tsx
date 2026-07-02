import { InfoBox } from '@/components/MessageBox';
import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useCounterStoreZustand } from '@/stores/useCounterStoreZustand';

function ZustandPage() {
  useRenderCounter('ZustandPage');

  const count = useCounterStoreZustand((state) => state.count);
  const increment = useCounterStoreZustand((state) => state.increment);
  const decrement = useCounterStoreZustand((state) => state.decrement);
  const reset = useCounterStoreZustand((state) => state.reset);

  return (
    <>
      <h1>Zustand</h1>

      <InfoBox>
        <p>
          <strong>Zustand</strong> is used for lightweight global state management.
        </p>
        <p>
          This example stores a counter outside of React component state so multiple components can
          share and update the same value.
        </p>
      </InfoBox>

      <section className="form-layout" style={{ flexDirection: 'row' }}>
        <p>
          <strong>Count: {count}</strong>
        </p>

        <button type="button" onClick={decrement}>
          Decrement
        </button>

        <button type="button" onClick={increment}>
          Increment
        </button>

        <button type="button" onClick={reset}>
          Reset
        </button>
      </section>
    </>
  );
}

export default ZustandPage;
