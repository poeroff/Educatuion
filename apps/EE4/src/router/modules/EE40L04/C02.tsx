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
        path: `L04-C02-A05a`,
        element: lazyLoad(() => import('../../../cards/L04/C02/A05a')),
        params: {
          ...layouts[ELayout.L04C02],
        },
        children: [],
      },
      {
        path: `L04-C02-A05b`,
        element: lazyLoad(() => import('../../../cards/L04/C02/A05b')),
        params: {
          ...layouts[ELayout.L04C02],
        },
        children: [],
      },
    ],
  },
];

export default router;
