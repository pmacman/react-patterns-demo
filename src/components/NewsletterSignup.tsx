import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useState } from 'react';

function NewsletterSignup() {
  useRenderCounter('NewsletterSignup');

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState<boolean | null>(null);
  const [submissionCount, setSubmissionCount] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailAddress = String(formData.get('email') ?? '').trim();
    const isValid = emailAddress !== '';
    if (!isValid) {
      return;
    }

    setEmail(emailAddress);
    setIsSubmitted(isValid);
    setSubmissionCount((count) => count + 1);
  };

  return (
    <section>
      <h2>Newsletter Signup</h2>

      <form onSubmit={handleSubmit} className="form-layout" data-testid="newsletter-form">
        <div>
          <label htmlFor="email">Enter your email address to subscribe:</label>
        </div>
        <div>
          <input id="email" name="email" type="email" defaultValue="test@email.com" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {isSubmitted && (
        <div className="form-success">
          <p>
            Thank you for subscribing {email}. Submission # {submissionCount}
          </p>
        </div>
      )}
    </section>
  );
}

export default NewsletterSignup;
