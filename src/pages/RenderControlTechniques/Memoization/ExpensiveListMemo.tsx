import { useRenderCounter } from '@/hooks/useRenderCounter';
import { memo } from 'react';

function ExpensiveList() {
  useRenderCounter('ExpensiveListMemo');

  return (
    <section>
      <h2>List Component</h2>

      <p>
        <em>This will not re-render.</em>
      </p>

      <ul>
        {Array.from({ length: 5 }, (_, index) => (
          <li key={index}>Expensive row {index + 1}</li>
        ))}
      </ul>
    </section>
  );
}

export const ExpensiveListMemo = memo(ExpensiveList);

// NOTE: This would cause a re-render.
// export const ExpensiveListMemo = ExpensiveList;
