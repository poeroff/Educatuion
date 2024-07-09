import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C030004-10`,
        element: lazyLoad(() => import('../../../cards/C03/0004/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },

      {
        path: `C030004-40`,
        element: lazyLoad(() => import('../../../cards/C03/0004/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },

      {
        path: `C030004-41`,
        element: lazyLoad(() => import('../../../cards/C03/0004/41')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },

      {
        path: `C030004-42`,
        element: lazyLoad(() => import('../../../cards/C03/0004/42')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `C030004-50`,
        element: lazyLoad(() => import('../../../cards/C03/0004/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `C030004-51`,
        element: lazyLoad(() => import('../../../cards/C03/0004/51')),
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
