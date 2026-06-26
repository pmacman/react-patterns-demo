import NotFound from '@/pages/NotFound';
import ReactHookFormPage from '@/pages/ReactHookForm/ReactHookFormPage';
import ComponentCompositionPage from '@/pages/RenderControlTechniques/ComponentComposition/ComponentCompositionPage';
import MemoizationPage from '@/pages/RenderControlTechniques/Memoization/MemoizationPage';
import PoorHandlingPage from '@/pages/RenderControlTechniques/PoorHandling/PoorHandlingPage';
import StateIsolationPage from '@/pages/RenderControlTechniques/StateIsolation/StateIsolationPage';
import TanStackQueryPage from '@/pages/TanStackQuery/TanStackQueryPage';
import ZodPage from '@/pages/Zod/ZodPage';
import ZustandPage from '@/pages/Zustand/ZustandPage';
import ZustandSummaryPage from '@/pages/Zustand/ZustandSummaryPage';
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
        element: <ZodPage />,
      },
      {
        path: 'tanstack-query',
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
