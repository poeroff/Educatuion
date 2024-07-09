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
        path: `L05-C03-A07a`,
        element: lazyLoad(() => import('../../../cards/L05/C03/A07a')),
        params: {
          ...layouts[ELayout.L05C03],
        },
        children: [],
      },
      {
        path: `L05-C03-A07b`,
        element: lazyLoad(() => import('../../../cards/L05/C03/A07b')),
        params: {
          ...layouts[ELayout.L05C03],
        },
        children: [],
      },
    ],
  },
];

export default router;
