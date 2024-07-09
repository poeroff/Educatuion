import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `DrawingSampleCard0001-01`,
        element: lazyLoad(() => import('../../../cards/DrawingSampleCard/0001/01')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
    ],
  },
];

export default router;
