import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C010002-10`,
        element: lazyLoad(() => import('../../../cards/C01/0002/10')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
      {
        path: `C010002-20`,
        element: lazyLoad(() => import('../../../cards/C01/0002/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `C010002-40`,
        element: lazyLoad(() => import('../../../cards/C01/0002/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `C010002-41`,
        element: lazyLoad(() => import('../../../cards/C01/0002/41')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `C010002-42`,
        element: lazyLoad(() => import('../../../cards/C01/0002/42')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `C010002-50`,
        element: lazyLoad(() => import('../../../cards/C01/0002/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `C010002-51`,
        element: lazyLoad(() => import('../../../cards/C01/0002/51')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `C010002-52`,
        element: lazyLoad(() => import('../../../cards/C01/0002/52')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
    ],
  },
];

export default router;
