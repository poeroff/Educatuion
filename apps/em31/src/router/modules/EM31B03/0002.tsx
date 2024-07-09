import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B030002-30`,
        element: lazyLoad(() => import('../../../cards/B03/0002/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
    ],
  },
];

export default router;
