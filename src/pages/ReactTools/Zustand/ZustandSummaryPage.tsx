import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useNameStore } from '@/stores/useNameStore';
import { NavLink } from 'react-router-dom';

function ZustandSummaryPage() {
  useRenderCounter('ZustandResultPage');

  const name = useNameStore((state) => state.name);

  return (
    <>
      <h1>Zustand Summary</h1>

      <div className={'section'}>
        <strong>Name: {name || 'No name submitted yet'}</strong>
      </div>

      <NavLink to="/zustand" className="secondary-link">
        Back
      </NavLink>
    </>
  );
}

export default ZustandSummaryPage;
