import { InfoBox } from '@/components/MessageBox';
import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useState } from 'react';
import {
  type FieldValues,
  type Path,
  type RegisterOptions,
  type SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';

type ContactFormValues = {
  fullName: string;
  email: string;
  age: number;
  contactMethod: 'email' | 'phone';
  phone: string;
  topic: string;
  message: string;
  subscribe: boolean;
};

// Maps each form field to its React Hook Form validation rules.
type ValidationRules<T extends FieldValues> = Partial<{
  [K in Path<T>]: RegisterOptions<T, K>;
}>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ReactHookFormPage() {
  useRenderCounter('ReactHookFormPage');

  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      age: 18,
      contactMethod: 'email',
      phone: '',
      topic: '',
      message: '',
      subscribe: false,
    },
  });

  const contactMethod = useWatch({ control: control, name: 'contactMethod' });

  // Optionally extract validation rules to a separate file (e.g., contactForm.validation.ts)
  const validationRules = {
    fullName: {
      required: 'Full name is required',
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: emailPattern,
        message: 'Enter a valid email',
      },
    },
    age: {
      required: 'Age is required',
      valueAsNumber: true,
      min: {
        value: 18,
        message: 'You must be at least 18',
      },
      max: {
        value: 120,
        message: 'Enter a realistic age',
      },
    },
    contactMethod: {
      required: 'Select a preferred contact method',
    },
    phone: {
      validate: (value: string) => {
        if (contactMethod === 'phone' && value.trim().length === 0) {
          return 'Phone number is required when phone is selected';
        }

        return true;
      },
    },
    topic: {
      required: 'Select a topic',
    },
    message: {
      required: 'Message is required',
      minLength: {
        value: 10,
        message: 'Message must be at least 10 characters',
      },
    },
  } satisfies ValidationRules<ContactFormValues>;

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log('Submitted form data:', data);
    setSubmittedData(data);
  };

  return (
    <>
      <h1>React Hook Form</h1>

      <InfoBox>
        <p>
          <strong>React Hook Form</strong> is used for form state management and validation.
        </p>
      </InfoBox>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="form-layout">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" {...register('fullName', validationRules.fullName)} />
          {errors.fullName && <div className="alert">{errors.fullName.message}</div>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email', validationRules.email)} />
          {errors.email && <div className="alert">{errors.email.message}</div>}
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register('age', validationRules.age)} />
          {errors.age && <div className="alert">{errors.age.message}</div>}
        </div>

        <div>
          <legend>Preferred Contact Method</legend>

          <label>
            <input
              type="radio"
              value="email"
              {...register('contactMethod', validationRules.contactMethod)}
            />
            Email
          </label>

          <label>
            <input
              type="radio"
              value="phone"
              {...register('contactMethod', validationRules.contactMethod)}
            />
            Phone
          </label>

          {errors.contactMethod && <div className="alert">{errors.contactMethod.message}</div>}

          {contactMethod === 'phone' && (
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" {...register('phone', validationRules.phone)} />
              {errors.phone && <div className="alert">{errors.phone.message}</div>}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="topic">Topic</label>
          <select id="topic" {...register('topic', validationRules.topic)}>
            <option value="">Select a topic</option>
            <option value="support">Support</option>
            <option value="sales">Sales</option>
            <option value="general">General</option>
          </select>
          {errors.topic && <div className="alert">{errors.topic.message}</div>}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" {...register('message', validationRules.message)} />
          {errors.message && <div className="alert">{errors.message.message}</div>}
        </div>

        <div>
          <label>
            <input type="checkbox" {...register('subscribe')} />
            Subscribe to newsletter
          </label>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {submittedData && (
        <section>
          <h2>Thank you for your submission!</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </section>
      )}
    </>
  );
}

export default ReactHookFormPage;
