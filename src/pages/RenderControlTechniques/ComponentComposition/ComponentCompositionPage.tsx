import ContactUs from '@/components/ContactUs';
import { InfoBox } from '@/components/MessageBox';
import NewsletterSignup from '@/components/NewsletterSignup';
import { useRenderCounter } from '@/hooks/useRenderCounter';
import ExpandableContainer from './ExpandableContainer';

function ComponentCompositionPage() {
  useRenderCounter('ComponentCompositionPage');

  return (
    <>
      <h1>Component Composition</h1>

      <InfoBox>
        <p>
          This example demonstrates <strong>Component Composition</strong> using{' '}
          <code>children</code>.
        </p>

        <p>
          <strong>Use Case:</strong> A reusable container component that renders different content
          supplied by its parent.
        </p>

        <ul>
          <li>
            The parent component passes child content into a reusable container using the{' '}
            <code>children</code> prop.
          </li>
          <li>Each child component manages its own local state.</li>
          <li>
            Updating one child component does not cause the other child component to re-render.
          </li>
        </ul>
      </InfoBox>

      <h2>Expandable Sections</h2>

      <ExpandableContainer id="NewsletterSignup">
        <NewsletterSignup />
      </ExpandableContainer>

      <ExpandableContainer id="ContactUs">
        <ContactUs />
      </ExpandableContainer>
    </>
  );
}

export default ComponentCompositionPage;
