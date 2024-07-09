import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B020011-20`,
        element: lazyLoad(() => import('../../../cards/B02/0011/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '7. 정사각형을 알아봐요',
        },
        children: [],
      },
      {
        path: `B020011-30`,
        element: lazyLoad(() => import('../../../cards/B02/0011/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '7. 정사각형을 알아봐요',
        },
        children: [],
      },
      {
        path: `B020011-40`,
        element: lazyLoad(() => import('../../../cards/B02/0011/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2.',
          mainChapter: '평면도형',
          subChapter: '',
        },
        children: [],
      },
      {
        path: `B020011-50`,
        element: lazyLoad(() => import('../../../cards/B02/0011/50')),
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
