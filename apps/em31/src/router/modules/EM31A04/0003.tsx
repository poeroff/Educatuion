import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A040003-01`,
        element: lazyLoad(() => import('../../../cards/A04/0003/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `A040003-02`,
        element: lazyLoad(() => import('../../../cards/A04/0003/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `A040003-03`,
        element: lazyLoad(() => import('../../../cards/A04/0003/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `A040003-04`,
        element: lazyLoad(() => import('../../../cards/A04/0003/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `A040003-05`,
        element: lazyLoad(() => import('../../../cards/A04/0003/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `A040003-06`,
        element: lazyLoad(() => import('../../../cards/A04/0003/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `A040003-07`,
        element: lazyLoad(() => import('../../../cards/A04/0003/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `A040003-08`,
        element: lazyLoad(() => import('../../../cards/A04/0003/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `A040003-09`,
        element: lazyLoad(() => import('../../../cards/A04/0003/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
      {
        path: `A040003-10`,
        element: lazyLoad(() => import('../../../cards/A04/0003/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
        },
        children: [],
      },
    ],
  },
];

export default router;
