import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const renderCounts = new Map<string, number>();

vi.mock('@/hooks/useRenderCounter', () => ({
  useRenderCounter(componentName: string) {
    renderCounts.set(componentName, (renderCounts.get(componentName) ?? 0) + 1);
  },
}));

import MemoizationPage from '@/pages/RenderControlTechniques/Memoization/MemoizationPage';

describe('Memoization render optimization', () => {
  beforeEach(() => {
    renderCounts.clear();
  });

  it('keeps sibling render counts isolated when each form is submitted', async () => {
    const user = userEvent.setup();

    render(<MemoizationPage />);

    expect(renderCounts.get('MemoizationPage')).toBe(1);
    expect(renderCounts.get('ExpensiveListMemo')).toBe(1);

    const countButton = screen.getByRole('button', { name: /count:/i });

    // Click "Count" button in parent component
    await user.click(countButton);

    expect(countButton).toHaveTextContent('Count: 1');
    expect(renderCounts.get('MemoizationPage')).toBe(2);
    expect(renderCounts.get('ExpensiveListMemo')).toBe(1);
  });
});
