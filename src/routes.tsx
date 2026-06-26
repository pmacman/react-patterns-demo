import NotFound from '@/pages/NotFound';
import ReactHookFormPage from '@/pages/ReactTools/ReactHookForm/ReactHookFormPage';
import TanStackQueryPage from '@/pages/ReactTools/TanStackQuery/TanStackQueryPage';
import ZodPage from '@/pages/ReactTools/Zod/ZodPage';
import ZustandPage from '@/pages/ReactTools/Zustand/ZustandPage';
import ZustandSummaryPage from '@/pages/ReactTools/Zustand/ZustandSummaryPage';
import ComponentCompositionPage from '@/pages/RenderControlTechniques/ComponentComposition/ComponentCompositionPage';
import MemoizationPage from '@/pages/RenderControlTechniques/Memoization/MemoizationPage';
import PoorHandlingPage from '@/pages/RenderControlTechniques/PoorHandling/PoorHandlingPage';
import StateIsolationPage from '@/pages/RenderControlTechniques/StateIsolation/StateIsolationPage';
import { createBrowserRouter } from 'react-router-dom';
import Root from './root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <TanStackQueryPage />,
      },
      {
        path: 'react-hook-form',
        element: <ReactHookFormPage />,
      },
      {
        path: 'zustand',
        element: <ZustandPage />,
      },
      {
        path: 'zod',
        element: <ZodPage />,
      },
      {
        path: 'zustand-summary',
        element: <ZustandSummaryPage />,
      },
      {
        path: 'poor-handling',
        element: <PoorHandlingPage />,
      },
      {
        path: 'memoization',
        element: <MemoizationPage />,
      },
      {
        path: 'state-isolation',
        element: <StateIsolationPage />,
      },
      {
        path: 'component-composition',
        element: <ComponentCompositionPage />,
      },
    ],
  },
]);
