import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const renderCounts = new Map<string, number>();

vi.mock('@/hooks/useRenderCounter', () => ({
  useRenderCounter(componentName: string) {
    renderCounts.set(componentName, (renderCounts.get(componentName) ?? 0) + 1);
  },
}));

import ComponentCompositionPage from '@/pages/RenderControlTechniques/ComponentComposition/ComponentCompositionPage';

describe('Component Composition render behavior', () => {
  beforeEach(() => {
    renderCounts.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps child render counts isolated when each expand button is pressed', async () => {
    const user = userEvent.setup();

    render(<ComponentCompositionPage />);

    expect(renderCounts.get('ComponentCompositionPage')).toBe(1);
    expect(renderCounts.get('ExpandableContainer-NewsletterSignup')).toBe(1);
    expect(renderCounts.get('ExpandableContainer-ContactUs')).toBe(1);
    expect(renderCounts.get('NewsletterSignup')).toBeUndefined();
    expect(renderCounts.get('ContactUs')).toBeUndefined();

    const expandButtons = screen.getAllByTestId('expand-button');
    expect(expandButtons).toHaveLength(2);

    // expand "Newsletter Signup" section
    await user.click(expandButtons[0]!);

    expect(screen.getByTestId('newsletter-form')).toBeInTheDocument();
    expect(screen.queryByTestId('contact-form')).not.toBeInTheDocument();
    expect(renderCounts.get('ComponentCompositionPage')).toBe(1);
    expect(renderCounts.get('ExpandableContainer-NewsletterSignup')).toBe(2);
    expect(renderCounts.get('ExpandableContainer-ContactUs')).toBe(1);
    expect(renderCounts.get('NewsletterSignup')).toBe(1);
    expect(renderCounts.get('ContactUs')).toBeUndefined();

    // expand "Contact Us" section
    await user.click(expandButtons[1]!);

    expect(screen.getByTestId('newsletter-form')).toBeInTheDocument();
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(renderCounts.get('ComponentCompositionPage')).toBe(1);
    expect(renderCounts.get('ExpandableContainer-NewsletterSignup')).toBe(2);
    expect(renderCounts.get('ExpandableContainer-ContactUs')).toBe(2);
    expect(renderCounts.get('NewsletterSignup')).toBe(1);
    expect(renderCounts.get('ContactUs')).toBe(1);
  });
});
