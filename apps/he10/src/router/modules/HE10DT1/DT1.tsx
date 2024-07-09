import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `DT1`,
        element: lazyLoad(() => import('../../../cards/DT1')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: '진단평가',
        },
        children: [],
      },
    ],
  },
];

export default router;
