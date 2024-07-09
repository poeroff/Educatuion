import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-SP04-1`,
        element: lazyLoad(() => import('../../../cards/L01/SP04-1')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: '보충학습',
          backGroundColor: 'blue',
        },
        children: [],
      },
    ],
  },
];

export default router;
