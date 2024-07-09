import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C040002-40`,
        element: lazyLoad(() => import('../../../cards/C04/0002/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요 (1)',
        },
        children: [],
      },
      {
        path: `C040002-41`,
        element: lazyLoad(() => import('../../../cards/C04/0002/41')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요 (1)',
        },
        children: [],
      },

      {
        path: `C040002-42`,
        element: lazyLoad(() => import('../../../cards/C04/0002/42')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '1. (두 자리 수)×(한 자리 수)를 계산해요 (1)',
        },
        children: [],
      },
    ],
  },
];

export default router;
