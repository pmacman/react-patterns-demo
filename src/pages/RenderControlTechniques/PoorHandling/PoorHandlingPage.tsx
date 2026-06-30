import ContactUs from '@/components/ContactUs';
import { InfoBox } from '@/components/MessageBox';
import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useState } from 'react';

function PoorHandlingPage() {
  useRenderCounter('PoorHandlingPage');

  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Poor Handling</h1>

      <InfoBox>
        <p>
          This example demonstrates <strong>poor</strong> render handling.
        </p>

        <p>
          <strong>Use Case:</strong> A parent component owns state that is unrelated to a child
          component.
        </p>

        <ul>
          <li>The parent component contains a Count button that updates its own state.</li>
          <li>
            The child component contains a Contact Us form with state local to that component.
          </li>
          <li>
            Updating the parent's state causes both the parent and the child component to re-render,
            even though the child's state and UI are unaffected.
          </li>
        </ul>
      </InfoBox>

      <section>
        <h2>Counter</h2>

        <div>
          <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
        </div>
      </section>

      <ContactUs />
    </>
  );
}

export default PoorHandlingPage;
