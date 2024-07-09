import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B030005-30`,
        element: lazyLoad(() => import('../../../cards/B03/0005/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },
      {
        path: `B030005-50`,
        element: lazyLoad(() => import('../../../cards/B03/0005/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },

      {
        path: `B030005-60`,
        element: lazyLoad(() => import('../../../cards/B03/0005/60')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },
      {
        path: `B030005-70`,
        element: lazyLoad(() => import('../../../cards/B03/0005/70')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },
    ],
  },
];

export default router;
