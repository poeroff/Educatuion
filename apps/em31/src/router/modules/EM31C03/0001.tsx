import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C030001-10`,
        element: lazyLoad(() => import('../../../cards/C03/0001/10')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '배운 내용',
        },
        children: [],
      },
      {
        path: `C030001-11`,
        element: lazyLoad(() => import('../../../cards/C03/0001/11')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '3.',

          mainChapter: '나눗셈',
          subChapter: '배운 내용',
        },
        children: [],
      },
      {
        path: `C030001-12`,
        element: lazyLoad(() => import('../../../cards/C03/0001/12')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '배운 내용',
        },
        children: [],
      },
      {
        path: `C030001-13`,
        element: lazyLoad(() => import('../../../cards/C03/0001/13')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '배운 내용',
        },
        children: [],
      },
      {
        path: `C030001-20`,
        element: lazyLoad(() => import('../../../cards/C03/0001/20')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '배운 내용',
        },
      },
      {
        path: `C030001-21`,
        element: lazyLoad(() => import('../../../cards/C03/0001/21')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '배운 내용',
        },
      },
      {
        path: `C030001-22`,
        element: lazyLoad(() => import('../../../cards/C03/0001/22')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '배운 내용',
        },
        children: [],
      },
      {
        path: `C030001-23`,
        element: lazyLoad(() => import('../../../cards/C03/0001/23')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '배운 내용',
        },
      },
    ],
  },
];

export default router;
