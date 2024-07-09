import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A040001-01`,
        element: lazyLoad(() => import('../../../cards/A04/0001/01')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '4.',
          mainChapter: '곱셈',
        },
        children: [],
      },
      {
        path: `A040001-02`,
        element: lazyLoad(() => import('../../../cards/A04/0001/02')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '4.',
          mainChapter: '곱셈',
        },
        children: [],
      },
      {
        path: `A040001-03`,
        element: lazyLoad(() => import('../../../cards/A04/0001/03')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '4.',
          mainChapter: '곱셈',
        },
        children: [],
      },
      {
        path: `A040001-04`,
        element: lazyLoad(() => import('../../../cards/A04/0001/04')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '4.',
          mainChapter: '곱셈',
        },
        children: [],
      },
      {
        path: `A040001-05`,
        element: lazyLoad(() => import('../../../cards/A04/0001/05')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '4.',
          mainChapter: '곱셈',
        },
        children: [],
      },
      {
        path: `A040001-06`,
        element: lazyLoad(() => import('../../../cards/A04/0001/06')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '4.',
          mainChapter: '곱셈',
        },
        children: [],
      },
    ],
  },
];

export default router;
