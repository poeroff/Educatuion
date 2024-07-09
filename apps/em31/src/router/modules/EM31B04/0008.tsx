import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B040008-10`,
        element: lazyLoad(() => import('../../../cards/B04/0008/10')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '4',
          mainChapter: '곱셈',
          subChapter: '해결하는 수학',
        },
        children: [],
      },
    ],
  },
];

export default router;
