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
        path: `L01-SP01`,
        element: lazyLoad(() => import('../../../cards/L01/SP01')),
        params: {
          ...layouts[ELayout.L01SP01],
        },
        children: [],
      },
    ],
  },
];

export default router;
