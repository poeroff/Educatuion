import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L03-C01-A01`,
        element: lazyLoad(() => import('../../../cards/L03/C01/A01')),
        params: {
          ...layouts[ELayout.TERTIARY],
          backGroundColor: 'purple',
        },
        children: [],
      },
      {
        path: `L03-C01-A02`,
        element: lazyLoad(() => import('../../../cards/L03/C01/A02')),
        params: {
          ...layouts[ELayout.TERTIARY],
          backGroundColor: 'purple',
        },
        children: [],
      },
    ],
  },
];

export default router;
