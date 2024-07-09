import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010010-01`,
        element: lazyLoad(() => import('../../../cards/A01/0010/01')),
        params: {
          ...layouts[EMathLayout.TERTIARY],
        },
        children: [],
      },
      {
        path: `A010010-02`,
        element: lazyLoad(() => import('../../../cards/A01/0010/02')),
        params: {
          ...layouts[EMathLayout.TERTIARY],
        },
        children: [],
      },
      {
        path: `A010010-03`,
        element: lazyLoad(() => import('../../../cards/A01/0010/03')),
        params: {
          ...layouts[EMathLayout.TERTIARY],
        },
        children: [],
      },
      {
        path: `A010010-04`,
        element: lazyLoad(() => import('../../../cards/A01/0010/04')),
        params: {
          ...layouts[EMathLayout.TERTIARY],
        },
        children: [],
      },
    ],
  },
];

export default router;
