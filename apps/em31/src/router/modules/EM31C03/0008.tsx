import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';
const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C030008-30`,
        element: lazyLoad(() => import('../../../cards/C03/0008/30')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C030008-31`,
        element: lazyLoad(() => import('../../../cards/C03/0008/31')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C030008-32`,
        element: lazyLoad(() => import('../../../cards/C03/0008/32')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C030008-33`,
        element: lazyLoad(() => import('../../../cards/C03/0008/33')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C030008-34`,
        element: lazyLoad(() => import('../../../cards/C03/0008/34')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C030008-35`,
        element: lazyLoad(() => import('../../../cards/C03/0008/35')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
    ],
  },
];
export default router;
