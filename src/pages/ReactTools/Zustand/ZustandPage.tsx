import { InfoBox } from '@/components/MessageBox';
import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useNameStore } from '@/stores/useNameStore';
import { useNavigate } from 'react-router-dom';

function ZustandPage() {
  useRenderCounter('ZustandPage');

  const navigate = useNavigate();
  const setName = useNameStore((state) => state.setName);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') ?? '').trim();

    setName(name);
    navigate('/zustand-summary');
  };

  return (
    <>
      <h1>Zustand</h1>

      <InfoBox>
        <p>
          <strong>Zustand</strong> is a lightweight client-side state management.
        </p>
      </InfoBox>

      <form onSubmit={handleSubmit} className={'form-layout'}>
        <div>
          <label htmlFor='name'>Enter your name:</label>
        </div>
        <div>
          <input id='name' name='name' type='text' onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  );
}

export default ZustandPage;
