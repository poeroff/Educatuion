import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { rootRouter } from './router';

import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import { GlobalGradeHStyled } from '@maidt-cntn/ui';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter(rootRouter as RouteObject[]);

root.render(
  <StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <GlobalGradeHStyled />
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>,
);
