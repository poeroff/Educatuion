import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A040002-01`,
        element: lazyLoad(() => import('../../../cards/A04/0002/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
      {
        path: `A040002-02`,
        element: lazyLoad(() => import('../../../cards/A04/0002/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
      {
        path: `A040002-03`,
        element: lazyLoad(() => import('../../../cards/A04/0002/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
      {
        path: `A040002-04`,
        element: lazyLoad(() => import('../../../cards/A04/0002/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
      {
        path: `A040002-05`,
        element: lazyLoad(() => import('../../../cards/A04/0002/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
      {
        path: `A040002-06`,
        element: lazyLoad(() => import('../../../cards/A04/0002/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
      {
        path: `A040002-07`,
        element: lazyLoad(() => import('../../../cards/A04/0002/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
      {
        path: `A040002-08`,
        element: lazyLoad(() => import('../../../cards/A04/0002/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
      {
        path: `A040002-09`,
        element: lazyLoad(() => import('../../../cards/A04/0002/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
      {
        path: `A040002-10`,
        element: lazyLoad(() => import('../../../cards/A04/0002/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요(1)',
        },
        children: [],
      },
    ],
  },
];

export default router;
