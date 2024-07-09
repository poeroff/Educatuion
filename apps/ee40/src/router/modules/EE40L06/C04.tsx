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
        path: `L06-C04-A01`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A01')),
        params: {
          ...layouts[ELayout.L06C04],
        },
        children: [],
      },
      {
        path: `L06-C04-A02`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A02')),
        params: {
          ...layouts[ELayout.L06C04],
        },
        children: [],
      },
      {
        path: `L06-C04-A03`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A03')),
        params: {
          ...layouts[ELayout.L06C04],
        },
        children: [],
      },
      {
        path: `L06-C04-A04`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A04')),
        params: {
          ...layouts[ELayout.L06C04],
        },
        children: [],
      },
      {
        path: `L06-C04-A05`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A05')),
        params: {
          ...layouts[ELayout.L06C04],
        },
        children: [],
      },
      {
        path: `L06-C04-A06`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A06')),
        params: {
          ...layouts[ELayout.L06C04],
        },
        children: [],
      },
      {
        path: `L06-C04-A07`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A07')),
        params: {
          ...layouts[ELayout.L06C04],
        },
        children: [],
      },
      {
        path: `L06-C04-A08`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A08')),
        params: {
          ...layouts[ELayout.L06C04],
        },
        children: [],
      },
    ],
  },
];

export default router;
