import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C010001-20`,
        element: lazyLoad(() => import('../../../cards/C01/0001/20')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
      {
        path: `C010001-21`,
        element: lazyLoad(() => import('../../../cards/C01/0001/21')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
      {
        path: `C010001-22`,
        element: lazyLoad(() => import('../../../cards/C01/0001/22')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
    ],
  },
];

export default router;
