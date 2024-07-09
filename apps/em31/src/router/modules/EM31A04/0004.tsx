import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A040004-01`,
        element: lazyLoad(() => import('../../../cards/A04/0004/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
      {
        path: `A040004-02`,
        element: lazyLoad(() => import('../../../cards/A04/0004/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
      {
        path: `A040004-03`,
        element: lazyLoad(() => import('../../../cards/A04/0004/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
      {
        path: `A040004-04`,
        element: lazyLoad(() => import('../../../cards/A04/0004/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
      {
        path: `A040004-05`,
        element: lazyLoad(() => import('../../../cards/A04/0004/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
      {
        path: `A040004-06`,
        element: lazyLoad(() => import('../../../cards/A04/0004/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
      {
        path: `A040004-07`,
        element: lazyLoad(() => import('../../../cards/A04/0004/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
      {
        path: `A040004-08`,
        element: lazyLoad(() => import('../../../cards/A04/0004/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
      {
        path: `A040004-09`,
        element: lazyLoad(() => import('../../../cards/A04/0004/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
      {
        path: `A040004-10`,
        element: lazyLoad(() => import('../../../cards/A04/0004/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '3. (두 자리 수) × (한 자리 수)를 계산해요(3)',
        },
        children: [],
      },
    ],
  },
];

export default router;
