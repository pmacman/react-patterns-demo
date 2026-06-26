import Navigation from '@/components/Navigation';
import { Outlet } from 'react-router-dom';
import './App.css';

function Root() {
  return (
    <div>
      <Navigation />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
