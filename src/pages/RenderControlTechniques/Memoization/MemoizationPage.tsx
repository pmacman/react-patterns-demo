import { InfoBox } from '@/components/MessageBox';
import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useState } from 'react';
import { ExpensiveListMemo } from './ExpensiveListMemo';

function MemoizationPage() {
  useRenderCounter('MemoizationPage');

  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Memoization</h1>

      <InfoBox>
        <p>
          This is an example of <strong>Memoization</strong>.
        </p>

        <p>
          <strong>Use Case:</strong> A child component that depends on its parent but does not need
          to re-render unless its props change.
        </p>

        <ul>
          <li>
            The parent component contains a <strong>Count</strong> button that updates its own
            state.
          </li>
          <li>The child component manages its own local state.</li>
          <li>
            The child component is wrapped with <code>React.memo()</code>, preventing unnecessary
            re-renders when the parent updates but the child's props remain unchanged.
          </li>
        </ul>
      </InfoBox>

      <section>
        <h2>Counter</h2>

        <div>
          <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
        </div>
      </section>

      <ExpensiveListMemo />
    </>
  );
}

export default MemoizationPage;
