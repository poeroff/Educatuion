import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020002-40`,
        element: lazyLoad(() => import('../../../cards/C02/0002/40')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '\u00A0평면도형',
          subChapter: '1. 선을 분류해요',
        },
        children: [],
      },
      {
        path: `C020002-41`,
        element: lazyLoad(() => import('../../../cards/C02/0002/41')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '\u00A0평면도형',
          subChapter: '1. 선을 분류해요',
        },
        children: [],
      },
      {
        path: `C020002-50`,
        element: lazyLoad(() => import('../../../cards/C02/0002/50')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '\u00A0평면도형',
          subChapter: '1. 선을 분류해요',
        },
        children: [],
      },
      {
        path: `C020002-51`,
        element: lazyLoad(() => import('../../../cards/C02/0002/51')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '\u00A0평면도형',
          subChapter: '1. 선을 분류해요',
        },
        children: [],
      },
      {
        path: `C020002-52`,
        element: lazyLoad(() => import('../../../cards/C02/0002/52')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '\u00A0평면도형',
          subChapter: '1. 선을 분류해요',
        },
        children: [],
      },
    ],
  },
];

export default router;
