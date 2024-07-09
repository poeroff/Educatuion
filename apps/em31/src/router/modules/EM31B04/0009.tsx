import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B040009-20`,
        element: lazyLoad(() => import('../../../cards/B04/0009/20')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `B040009-30`,
        element: lazyLoad(() => import('../../../cards/B04/0009/30')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `B040009-40`,
        element: lazyLoad(() => import('../../../cards/B04/0009/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
        },
        children: [],
      },
      {
        path: `B040009-50`,
        element: lazyLoad(() => import('../../../cards/B04/0009/50')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
        },
      },
    ],
  },
];

export default router;
