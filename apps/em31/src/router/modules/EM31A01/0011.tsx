import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010011-01`,
        element: lazyLoad(() => import('../../../cards/A01/0011/01')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
        },
        children: [],
      },
      {
        path: `A010011-02`,
        element: lazyLoad(() => import('../../../cards/A01/0011/02')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
        },
        children: [],
      },
      {
        path: `A010011-03`,
        element: lazyLoad(() => import('../../../cards/A01/0011/03')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
        },
        children: [],
      },
      {
        path: `A010011-04`,
        element: lazyLoad(() => import('../../../cards/A01/0011/04')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
        },
        children: [],
      },
      {
        path: `A010011-07`,
        element: lazyLoad(() => import('../../../cards/A01/0011/07')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
        },
        children: [],
      },
    ],
  },
];

export default router;
