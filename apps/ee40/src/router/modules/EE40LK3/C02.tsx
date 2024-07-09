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
        path: `LK3-C02-A01`,
        element: lazyLoad(() => import('../../../cards/LK3/C02/A01')),
        params: {
          ...layouts[ELayout.LK3C02],
        },
        children: [],
      },
      {
        path: `LK3-C02-A02`,
        element: lazyLoad(() => import('../../../cards/LK3/C02/A02')),
        params: {
          ...layouts[ELayout.LK3C02],
        },
        children: [],
      },
      {
        path: `LK3-C02-A03`,
        element: lazyLoad(() => import('../../../cards/LK3/C02/A03')),
        params: {
          ...layouts[ELayout.LK3C02],
        },
        children: [],
      },
    ],
  },
];
export default router;
