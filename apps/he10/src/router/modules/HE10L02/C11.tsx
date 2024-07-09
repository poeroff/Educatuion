import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-C11-A01`,
        element: lazyLoad(() => import('../../../cards/L02/C11/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2. ',
          mainChapter: 'Open a Book, Open the World',
          subChapter: 'Wrap Up',
        },
        children: [],
      },
      {
        path: `L02-C11-A02`,
        element: lazyLoad(() => import('../../../cards/L02/C11/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2. ',
          mainChapter: 'Open a Book, Open the World',
          subChapter: 'Wrap Up',
        },
        children: [],
      },
      {
        path: `L02-C11-A03`,
        element: lazyLoad(() => import('../../../cards/L02/C11/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2. ',
          mainChapter: 'Open a Book, Open the World',
          subChapter: 'Wrap Up',
        },
        children: [],
      },
      {
        path: `L02-C11-A04`,
        element: lazyLoad(() => import('../../../cards/L02/C11/A04')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2.',
          mainChapter: 'Open a Book, Open the World',
          subChapter: 'Wrap Up',
        },
        children: [],
      },
      {
        path: `L02-C11-A05`,
        element: lazyLoad(() => import('../../../cards/L02/C11/A05')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2. ',
          mainChapter: 'Open a Book, Open the World',
          subChapter: 'Wrap Up',
        },
        children: [],
      },
    ],
  },
];

export default router;
