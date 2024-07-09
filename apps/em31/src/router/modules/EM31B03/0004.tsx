import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B030004-30`,
        element: lazyLoad(() => import('../../../cards/B03/0004/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `B030004-40`,
        element: lazyLoad(() => import('../../../cards/B03/0004/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `B030004-50`,
        element: lazyLoad(() => import('../../../cards/B03/0004/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `B030004-60`,
        element: lazyLoad(() => import('../../../cards/B03/0004/60')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `B030004-70`,
        element: lazyLoad(() => import('../../../cards/B03/0004/70')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
    ],
  },
];

export default router;
