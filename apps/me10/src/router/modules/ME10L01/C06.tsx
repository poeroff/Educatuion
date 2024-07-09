import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-C06-A01`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L01-C06-A02`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L01-C06-A03`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L01-C06-A04`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A04')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L01-C06-A05`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A05')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L01-C06-A05a`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A05a')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L01-C06-A05b`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A05b')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L01-C06-A06`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A06')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L01-C06-A06a`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A06a')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L01-C06-A06b`,
        element: lazyLoad(() => import('../../../cards/L01/C06/A06b')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
    ],
  },
];

export default router;
