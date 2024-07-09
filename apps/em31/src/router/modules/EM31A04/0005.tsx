import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A040005-01`,
        element: lazyLoad(() => import('../../../cards/A04/0005/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
      {
        path: `A040005-02`,
        element: lazyLoad(() => import('../../../cards/A04/0005/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
      {
        path: `A040005-03`,
        element: lazyLoad(() => import('../../../cards/A04/0005/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
      {
        path: `A040005-04`,
        element: lazyLoad(() => import('../../../cards/A04/0005/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
      {
        path: `A040005-05`,
        element: lazyLoad(() => import('../../../cards/A04/0005/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
      {
        path: `A040005-06`,
        element: lazyLoad(() => import('../../../cards/A04/0005/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
      {
        path: `A040005-07`,
        element: lazyLoad(() => import('../../../cards/A04/0005/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
      {
        path: `A040005-08`,
        element: lazyLoad(() => import('../../../cards/A04/0005/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
      {
        path: `A040005-09`,
        element: lazyLoad(() => import('../../../cards/A04/0005/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
      {
        path: `A040005-10`,
        element: lazyLoad(() => import('../../../cards/A04/0005/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '4. (두 자리 수)×(한 자리 수)를 계산해요(4)',
        },
        children: [],
      },
    ],
  },
];

export default router;
