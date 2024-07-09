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
        path: `SL1-C01-A01`,
        element: lazyLoad(() => import('../../../cards/SL1/C01/A01')),
        params: {
          ...layouts[ELayout.SL1C01],
        },
        children: [],
      },
      // {
      //   path: `SL1-C01-A02`,
      //   element: lazyLoad(() => import('../../../cards/SL1/C01/A02')),
      //   params: {
      //     ...layouts[ELayout.SL1C01],
      //   },
      //   children: [],
      // },
      {
        path: `SL1-C01-A03`,
        element: lazyLoad(() => import('../../../cards/SL1/C01/A03')),
        params: {
          ...layouts[ELayout.SL1C01],
        },
        children: [],
      },
      // {
      //   path: `SL1-C01-A04`,
      //   element: lazyLoad(() => import('../../../cards/SL1/C01/A04')),
      //   params: {
      //     ...layouts[ELayout.SL1C01],
      //   },
      //   children: [],
      // },
      // {
      //   path: `SL1-C01-A05`,
      //   element: lazyLoad(() => import('../../../cards/SL1/C01/A05')),
      //   params: {
      //     ...layouts[ELayout.SL1C01],
      //   },
      //   children: [],
      // },
    ],
  },
];

export default router;