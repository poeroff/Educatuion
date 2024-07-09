import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C040009-30`,
        element: lazyLoad(() => import('../../../cards/C04/0009/30')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C040009-31`,
        element: lazyLoad(() => import('../../../cards/C04/0009/31')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C040009-32`,
        element: lazyLoad(() => import('../../../cards/C04/0009/32')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C040009-33`,
        element: lazyLoad(() => import('../../../cards/C04/0009/33')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C040009-34`,
        element: lazyLoad(() => import('../../../cards/C04/0009/34')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C040009-35`,
        element: lazyLoad(() => import('../../../cards/C04/0009/35')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
    ],
  },
];

export default router;
