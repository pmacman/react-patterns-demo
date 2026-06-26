import { useRenderCounter } from '@/hooks/useRenderCounter';
import { memo } from 'react';

function ExpensiveList() {
  useRenderCounter('ExpensiveListMemo');

  return (
    <div>
      <h2>List Component</h2>

      <p>
        <em>This will NOT re-render.</em>
      </p>

      <ul>
        {Array.from({ length: 5 }, (_, index) => (
          <li key={index}>Expensive row {index + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export const ExpensiveListMemo = memo(ExpensiveList);

// NOTE: This would cause a re-render.
// export const ExpensiveListMemo = ExpensiveList;
