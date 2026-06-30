import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const renderCounts = new Map<string, number>();

vi.mock('@/hooks/useRenderCounter', () => ({
  useRenderCounter(componentName: string) {
    renderCounts.set(componentName, (renderCounts.get(componentName) ?? 0) + 1);
  },
}));

import PoorHandlingPage from '@/pages/RenderControlTechniques/PoorHandling/PoorHandlingPage';

describe('Poor State Handling render behavior', () => {
  beforeEach(() => {
    renderCounts.clear();
  });

  it('re-renders ContactUs when unrelated parent state changes', async () => {
    const user = userEvent.setup();

    render(<PoorHandlingPage />);

    expect(renderCounts.get('PoorHandlingPage')).toBe(1);
    expect(renderCounts.get('ContactUs')).toBe(1);

    const countButton = screen.getByRole('button', { name: /count:/i });

    // Click "Count" button in parent component
    await user.click(countButton);

    expect(countButton).toHaveTextContent('Count: 1');
    expect(renderCounts.get('PoorHandlingPage')).toBe(2);
    expect(renderCounts.get('ContactUs')).toBe(2);
  });
});
