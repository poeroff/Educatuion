import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L04-C06-A01`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A01')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A02`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A02')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A03`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A03')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A03a`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A03a')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A03b`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A03b')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A04`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A04')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A04a`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A04a')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A04b`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A04b')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A05`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A05')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A05a`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A05a')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A05b`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A05b')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A06`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A06')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A06a`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A06a')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A06b`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A06b')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A07`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A07')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A07a`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A07a')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A07b`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A07b')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `L04-C06-A08`,
        element: lazyLoad(() => import('../../../cards/L04/C06/A08')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Read',
        },
        children: [],
      },
    ],
  },
];

export default router;
