import { useRenderCounter } from '@/hooks/useRenderCounter';
import { NavLink } from 'react-router-dom';

function Navigation() {
  useRenderCounter('NavigationComponent', false);

  return (
    <div className={'nav-primary'}>
      <div className={'nav-row'}>
        <div className={'nav-title'}>Tools</div>
        <nav className={'nav-items'}>
          <NavLink to='/'>Zod</NavLink>
          <NavLink to='/tanstack-query'>TanStack Query</NavLink>
          <NavLink to='/react-hook-form'>React Hook Form</NavLink>
          <NavLink to='/zustand'>Zustand</NavLink>
        </nav>
      </div>

      <div className={'nav-row'}>
        <div className={'nav-title'}>Rendering Optimzation</div>
        <nav className={'nav-items'}>
          <NavLink to='/poor-handling'>Poor Handling</NavLink>
          <NavLink to='/state-isolation'>State Isolation</NavLink>
          <NavLink to='/component-composition'>Component Composition</NavLink>
          <NavLink to='/memoization'>Memoization</NavLink>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
