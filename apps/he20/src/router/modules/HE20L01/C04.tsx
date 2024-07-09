import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-C04-A01`,
        element: lazyLoad(() => import('../../../cards/L01/C04/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Presentation | Companion Animal Care Tips',
        },
        children: [],
      },
      {
        path: `L01-C04-A02`,
        element: lazyLoad(() => import('../../../cards/L01/C04/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Presentation | Companion Animal Care Tips',
        },
        children: [],
      },
      {
        path: `L01-C04-A03`,
        element: lazyLoad(() => import('../../../cards/L01/C04/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Presentation | Companion Animal Care Tips',
        },
        children: [],
      },
    ],
  },
];

export default router;
