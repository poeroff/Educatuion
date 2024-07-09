import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { rootRouter } from './router';

import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import { GlobalGradeMStyled } from '@maidt-cntn/ui';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createHashRouter(rootRouter as RouteObject[]);

root.render(
  <StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <GlobalGradeMStyled />
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>,
);
