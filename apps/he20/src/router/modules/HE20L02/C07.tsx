import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-C07-A01`,
        element: lazyLoad(() => import('../../../cards/L02/C07/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2.',
          mainChapter: 'Be a Wise Consumer',
          subChapter: 'After You Read',
          minorChapter: '',
        },
        children: [],
      },
      {
        path: `L02-C07-A02`,
        element: lazyLoad(() => import('../../../cards/L02/C07/A02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `L02-C07-A02a`,
        element: lazyLoad(() => import('../../../cards/L02/C07/A02a')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `L02-C07-A02b`,
        element: lazyLoad(() => import('../../../cards/L02/C07/A02b')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `L02-C07-A03`,
        element: lazyLoad(() => import('../../../cards/L02/C07/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2.',
          mainChapter: 'Be a Wise Consumer',
          subChapter: 'After You Read',
          minorChapter: '',
        },
        children: [],
      },
      {
        path: `L02-C07-A04`,
        element: lazyLoad(() => import('../../../cards/L02/C07/A04')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2.',
          mainChapter: 'Be a Wise Consumer',
          subChapter: 'After You Read',
          minorChapter: '',
        },
        children: [],
      },
    ],
  },
];

export default router;
