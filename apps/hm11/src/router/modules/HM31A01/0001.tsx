import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010001-01`,
        element: lazyLoad(() => import('../../../cards/A01/0001/01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `A010002-01`,
        element: lazyLoad(() => import('../../../cards/A01/0002/01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
    ],
  },
];

export default router;
