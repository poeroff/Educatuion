import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-C01-A01`,
        element: lazyLoad(() => import('../../../cards/L02/C01/A01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          backGroundColor: 'purple',
        },
        children: [],
      },
      {
        path: `L02-C01-A02`,
        element: lazyLoad(() => import('../../../cards/L02/C01/A02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          backGroundColor: 'purple',
        },
        children: [],
      },
    ],
  },
];

export default router;
