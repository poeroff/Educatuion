import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-C04-A03`,
        element: lazyLoad(() => import('../../../cards/L01/C04/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          mainChapter: 'You and I Become "We"',
          subChapter: 'Plan & Present : Speech | Welcome to High School',
          minorChapter: '',
        },
        children: [],
      },
      {
        path: `L01-C04-A01`,
        element: lazyLoad(() => import('../../../cards/L01/C04/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present',
        },
        children: [],
      },
      {
        path: `L01-C04-A02`,
        element: lazyLoad(() => import('../../../cards/L01/C04/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
    ],
  },
];

export default router;
