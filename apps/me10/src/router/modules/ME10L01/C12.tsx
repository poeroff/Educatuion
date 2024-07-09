import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-C12-A01`,
        element: lazyLoad(() => import('../../../cards/L01/C12/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          mainChapter: 'Are You Ready?',
          subChapter: 'Wrap Up',
        },
        children: [],
      },
      {
        path: `L01-C12-A02`,
        element: lazyLoad(() => import('../../../cards/L01/C12/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          mainChapter: 'Are You Ready?',
          subChapter: 'Wrap Up',
        },
        children: [],
      },
      {
        path: `L01-C12-A03`,
        element: lazyLoad(() => import('../../../cards/L01/C12/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          mainChapter: 'Are You Ready?',
          subChapter: 'Wrap Up',
          backGroundColor: 'purple'
        },
        children: [],
      },
      {
        path: `L01-C12-A04`,
        element: lazyLoad(() => import('../../../cards/L01/C12/A04')),
        params: {
          ...layouts[ELayout.INTRO],
          mainChapter: 'Are You Ready?',
          subChapter: 'Wrap Up',
          backGroundColor: 'purple'
        },
        children: [],
      },
      {
        path: `L01-C12-A05`,
        element: lazyLoad(() => import('../../../cards/L01/C12/A05')),
        params: {
          ...layouts[ELayout.INTRO],
          mainChapter: ' Are You Ready?',
          subChapter: 'Wrap Up',
          minorChapter: '',
        },
        children: [],
      },
      {
        path: `L01-C12-A06`,
        element: lazyLoad(() => import('../../../cards/L01/C12/A06')),
        params: {
          ...layouts[ELayout.INTRO],
          mainChapter: 'Are You Ready?',
          subChapter: 'Wrap Up',
        },
        children: [],
      },
      {
        path: `L01-C12-A07`,
        element: lazyLoad(() => import('../../../cards/L01/C12/A07')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Wrap Up',
        },
        children: [],
      },
      {
        path: `L01-C12-A08`,
        element: lazyLoad(() => import('../../../cards/L01/C12/A08')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Wrap Up',
        },
        children: [],
      },
    ],
  },
];

export default router;
