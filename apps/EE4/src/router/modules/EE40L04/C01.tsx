import { layouts } from '@/constants/layout';
import { lazyLoad } from '@maidt-cntn/router';
import { IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L04-C01-A06a`,
        element: lazyLoad(() => import('../../../cards/L04/C01/A06a')),
        params: {
          ...layouts[ELayout.L04C01],
        },
        children: [],
      },
      {
        path: `L04-C01-A06b`,
        element: lazyLoad(() => import('../../../cards/L04/C01/A06b')),
        params: {
          ...layouts[ELayout.L04C01],
        },
        children: [],
      },
    ],
  },
];

export default router;
