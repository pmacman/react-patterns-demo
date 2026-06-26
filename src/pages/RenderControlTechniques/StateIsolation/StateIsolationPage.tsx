import ContactUs from '@/components/ContactUs';
import { InfoBox } from '@/components/MessageBox';
import NewsletterSignup from '@/components/NewsletterSignup';
import { useRenderCounter } from '@/hooks/useRenderCounter';

function StateIsolationPage() {
  useRenderCounter('StateIsolationPage');

  return (
    <>
      <h1>State Isolation</h1>

      <InfoBox>
        <p>
          This example demonstrates <strong>State Isolation</strong> (also known as{' '}
          <strong>Component Colocation</strong>).
        </p>

        <p>
          <strong>Use Case:</strong> Multiple independent, reusable components that manage their own
          state.
        </p>

        <ul>
          <li>The parent component renders two independent child components.</li>
          <li>Each child component manages its own local state.</li>
          <li>
            Updating one child component does not cause the other child component to re-render.
          </li>
        </ul>
      </InfoBox>

      <NewsletterSignup />

      <ContactUs />
    </>
  );
}

export default StateIsolationPage;
