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
        path: `L04-C03-A01`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A01')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },
      {
        path: `L04-C03-A02`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A02')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },
      {
        path: `L04-C03-A03`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A03')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },
      {
        path: `L04-C03-A04`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A04')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },
      {
        path: `L04-C03-A05`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A05')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },
      {
        path: `L04-C03-A06`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A06')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },
      {
        path: `L04-C03-A07`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A07')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },

      // {
      //   path: `L04-C03-A07a`,
      //   element: lazyLoad(() => import('../../../cards/L04/C03/A07a')),
      //   params: {
      //     ...layouts[ELayout.L04C03],
      //   },
      //   children: [],
      // },

      // {
      //   path: `L04-C03-A07b`,
      //   element: lazyLoad(() => import('../../../cards/L04/C03/A07b')),
      //   params: {
      //     ...layouts[ELayout.L04C03],
      //   },
      //   children: [],
      // },
      {
        path: `L04-C03-A08`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A08')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },

      {
        path: `L04-C03-A09`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A09')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },

      {
        path: `L04-C03-A10`,
        element: lazyLoad(() => import('../../../cards/L04/C03/A10')),
        params: {
          ...layouts[ELayout.L04C03],
        },
        children: [],
      },
    ],
  },
];

export default router;
