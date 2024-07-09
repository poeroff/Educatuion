import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B040003-30`,
        element: lazyLoad(() => import('../../../cards/B04/0003/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `B040003-50`,
        element: lazyLoad(() => import('../../../cards/B04/0003/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '(두 자리 수) ×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
    ],
  },
];

export default router;
