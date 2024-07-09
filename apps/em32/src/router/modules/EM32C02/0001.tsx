import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020001-10`,
        element: lazyLoad(() => import('../../../cards/C02/0001/10')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '원',
          subChapter: '단원 도입',
        },
        children: [],
      },
      {
        path: `C020001-11`,
        element: lazyLoad(() => import('../../../cards/C02/0001/11')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '원',
          subChapter: '단원 도입',
        },
        children: [],
      },
      {
        path: `C020001-12`,
        element: lazyLoad(() => import('../../../cards/C02/0001/12')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '원',
          subChapter: '단원 도입',
        },
        children: [],
      },
      {
        path: `C020001-13`,
        element: lazyLoad(() => import('../../../cards/C02/0001/13')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '원',
          subChapter: '단원 도입',
        },
        children: [],
      },
      {
        path: `C020001-20`,
        element: lazyLoad(() => import('../../../cards/C02/0001/20')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '원',
          subChapter: '단원 도입',
        },
        children: [],
      },
    ],
  },
];

export default router;
