import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-C08-A01`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A02`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A03`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A03a`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A03a')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A03b`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A03b')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A04`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A04')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A05`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A05')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A05a`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A05a')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A05b`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A05b')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A06`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A06')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `L01-C08-A07`,
        element: lazyLoad(() => import('../../../cards/L01/C08/A07')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
    ],
  },
];

export default router;
