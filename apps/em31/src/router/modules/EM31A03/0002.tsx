import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A030002-01`,
        element: lazyLoad(() => import('../../../cards/A03/0002/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
      {
        path: `A030002-02`,
        element: lazyLoad(() => import('../../../cards/A03/0002/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
      {
        path: `A030002-03`,
        element: lazyLoad(() => import('../../../cards/A03/0002/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
      {
        path: `A030002-04`,
        element: lazyLoad(() => import('../../../cards/A03/0002/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
      {
        path: `A030002-05`,
        element: lazyLoad(() => import('../../../cards/A03/0002/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
      {
        path: `A030002-06`,
        element: lazyLoad(() => import('../../../cards/A03/0002/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
      {
        path: `A030002-07`,
        element: lazyLoad(() => import('../../../cards/A03/0002/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
      {
        path: `A030002-08`,
        element: lazyLoad(() => import('../../../cards/A03/0002/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
      {
        path: `A030002-09`,
        element: lazyLoad(() => import('../../../cards/A03/0002/09')),
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
