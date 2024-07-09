import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-C02-A01`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L01-C02-A02`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L01-C02-A03`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L01-C02-A04`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A04')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L01-C02-A05`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A05')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L01-C02-A06`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A06')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },

      {
        path: `L01-C02-A07`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A07')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Communicate',
          backGroundColor: 'green',
        },
        children: [],
      },

      {
        path: `L01-C02-A08`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A08')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Communicate',
          backGroundColor: 'green',
        },
        children: [],
      },
      {
        path: `L01-C02-A08a`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A08a')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L01-C02-A08b`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A08b')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L01-C02-A09`,
        element: lazyLoad(() => import('../../../cards/L01/C02/A09')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
    ],
  },
];

export default router;
