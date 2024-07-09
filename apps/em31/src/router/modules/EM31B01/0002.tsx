import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010002-30`,
        element: lazyLoad(() => import('../../../cards/B01/0002/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `B010002-40`,
        element: lazyLoad(() => import('../../../cards/B01/0002/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `B010002-50`,
        element: lazyLoad(() => import('../../../cards/B01/0002/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `B010002-60`,
        element: lazyLoad(() => import('../../../cards/B01/0002/60')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `B010002-70`,
        element: lazyLoad(() => import('../../../cards/B01/0002/70')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
    ],
  },
];

export default router;
