import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020011-10`,
        element: lazyLoad(() => import('../../../cards/C02/0011/10')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C020011-30`,
        element: lazyLoad(() => import('../../../cards/C02/0011/30')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C020011-31`,
        element: lazyLoad(() => import('../../../cards/C02/0011/31')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C020011-32`,
        element: lazyLoad(() => import('../../../cards/C02/0011/32')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C020011-33`,
        element: lazyLoad(() => import('../../../cards/C02/0011/33')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C020011-34`,
        element: lazyLoad(() => import('../../../cards/C02/0011/34')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C020011-35`,
        element: lazyLoad(() => import('../../../cards/C02/0011/35')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
    ],
  },
];

export default router;
