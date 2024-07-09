import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A030003-01`,
        element: lazyLoad(() => import('../../../cards/A03/0003/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `A030003-02`,
        element: lazyLoad(() => import('../../../cards/A03/0003/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `A030003-03`,
        element: lazyLoad(() => import('../../../cards/A03/0003/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `A030003-04`,
        element: lazyLoad(() => import('../../../cards/A03/0003/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `A030003-05`,
        element: lazyLoad(() => import('../../../cards/A03/0003/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `A030003-06`,
        element: lazyLoad(() => import('../../../cards/A03/0003/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `A030003-07`,
        element: lazyLoad(() => import('../../../cards/A03/0003/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `A030003-08`,
        element: lazyLoad(() => import('../../../cards/A03/0003/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
      {
        path: `A030003-09`,
        element: lazyLoad(() => import('../../../cards/A03/0003/09')),
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
