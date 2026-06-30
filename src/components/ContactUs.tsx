import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useState } from 'react';

function ContactUs() {
  useRenderCounter('ContactUs');

  const [isSubmitted, setIsSubmitted] = useState<boolean | null>(null);
  const [submissionCount, setSubmissionCount] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setSubmissionCount((count) => count + 1);
  };

  return (
    <section>
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit} className="form-layout" data-testid="contact-form">
        <div>
          <label htmlFor="comments">Enter your comments:</label>
        </div>
        <div>
          <textarea id="comments" name="comments" defaultValue="My comments..." />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {isSubmitted && (
        <div className="form-success">
          <p>Thank you for your submission! Submission # {submissionCount}</p>
        </div>
      )}
    </section>
  );
}

export default ContactUs;
