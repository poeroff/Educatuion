import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B030003-40`,
        element: lazyLoad(() => import('../../../cards/B03/0003/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `B030003-60`,
        element: lazyLoad(() => import('../../../cards/B03/0003/60')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `B030003-70`,
        element: lazyLoad(() => import('../../../cards/B03/0003/70')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
    ],
  },
];

export default router;
