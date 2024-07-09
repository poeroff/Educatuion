import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L04-C01-A01`,
        element: lazyLoad(() => import('../../../cards/L04/C01/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Sink or Swim in the Digital Ocean',
        },
        children: [],
      },
    ],
  },
];

export default router;
