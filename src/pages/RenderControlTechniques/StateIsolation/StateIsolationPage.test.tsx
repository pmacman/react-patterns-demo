import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const renderCounts = new Map<string, number>();

vi.mock('@/hooks/useRenderCounter', () => ({
  useRenderCounter(componentName: string) {
    renderCounts.set(componentName, (renderCounts.get(componentName) ?? 0) + 1);
  },
}));

import ContactUs from '@/components/ContactUs';
import NewsletterSignup from '@/components/NewsletterSignup';

describe('State Isolation render optimization', () => {
  beforeEach(() => {
    renderCounts.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps sibling render counts isolated when each form is submitted', async () => {
    const user = userEvent.setup();

    render(
      <>
        <NewsletterSignup />
        <ContactUs />
      </>,
    );

    expect(renderCounts.get('NewsletterSignup')).toBe(1);
    expect(renderCounts.get('ContactUs')).toBe(1);

    const newsletterSection = screen.getByTestId('newsletter-form');
    const contactSection = screen.getByTestId('contact-form');

    expect(newsletterSection).toBeTruthy();
    expect(contactSection).toBeTruthy();

    const newsletterSubmitButton = within(newsletterSection!).getByRole('button', {
      name: /submit/i,
    });

    // Submit "Newsletter" form
    await user.click(newsletterSubmitButton);

    expect(
      await screen.findByText(/thank you for subscribing test@email.com/i),
    ).toBeInTheDocument();

    expect(renderCounts.get('NewsletterSignup')).toBe(2);
    expect(renderCounts.get('ContactUs')).toBe(1);

    const contactSubmitButton = within(contactSection!).getByRole('button', {
      name: /submit/i,
    });

    // Submit "Contact Us" form
    await user.click(contactSubmitButton);

    expect(await screen.findByText(/thank you for your submission!/i)).toBeInTheDocument();

    expect(renderCounts.get('ContactUs')).toBe(2);
    expect(renderCounts.get('NewsletterSignup')).toBe(2);
  });
});
