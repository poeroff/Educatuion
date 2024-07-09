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
        path: `L07-C02-A01`,
        element: lazyLoad(() => import('../../../cards/L07/C02/A01')),
        params: {
          ...layouts[ELayout.L07C02],
        },
        children: [],
      },
      {
        path: `L07-C02-A02`,
        element: lazyLoad(() => import('../../../cards/L07/C02/A02')),
        params: {
          ...layouts[ELayout.L07C02],
        },
        children: [],
      },
      {
        path: `L07-C02-A03`,
        element: lazyLoad(() => import('../../../cards/L07/C02/A03')),
        params: {
          ...layouts[ELayout.L07C02],
        },
        children: [],
      },
      {
        path: `L07-C02-A04`,
        element: lazyLoad(() => import('../../../cards/L07/C02/A04')),
        params: {
          ...layouts[ELayout.L07C02],
        },
        children: [],
      },
      {
        path: `L07-C02-A05`,
        element: lazyLoad(() => import('../../../cards/L07/C02/A05')),
        params: {
          ...layouts[ELayout.L07C02],
        },
        children: [],
      },
      // {
      //   path: `L07-C02-A05a`,
      //   element: lazyLoad(() => import('../../../cards/L07/C02/A05a')),
      //   params: {
      //     ...layouts[ELayout.L07C02],
      //   },
      //   children: [],
      // },
      // {
      //   path: `L07-C02-A05b`,
      //   element: lazyLoad(() => import('../../../cards/L07/C02/A05b')),
      //   params: {
      //     ...layouts[ELayout.L07C02],
      //   },
      //   children: [],
      // },
      {
        path: `L07-C02-A06`,
        element: lazyLoad(() => import('../../../cards/L07/C02/A06')),
        params: {
          ...layouts[ELayout.L07C02],
        },
        children: [],
      },
      {
        path: `L07-C02-A07`,
        element: lazyLoad(() => import('../../../cards/L07/C02/A07')),
        params: {
          ...layouts[ELayout.L07C02],
        },
        children: [],
      },
    ],
  },
];

export default router;
