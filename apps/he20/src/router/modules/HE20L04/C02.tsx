import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L04-C02-A01`,
        element: lazyLoad(() => import('../../../cards/L04/C02/A01')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Listen & Speak 1 : Digital Revolution Everywhere',
        },
        children: [],
      },
      {
        path: `L04-C02-A02`,
        element: lazyLoad(() => import('../../../cards/L04/C02/A02')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Listen & Speak 1 : Digital Revolution Everywhere',
        },
        children: [],
      },
      {
        path: `L04-C02-A03`,
        element: lazyLoad(() => import('../../../cards/L04/C02/A03')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Listen & Speak 1 : Digital Revolution Everywhere',
        },
        children: [],
      },
      {
        path: `L04-C02-A03a`,
        element: lazyLoad(() => import('../../../cards/L04/C02/A03a')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Listen & Speak 1 : Digital Revolution Everywhere',
        },
        children: [],
      },
      {
        path: `L04-C02-A03b`,
        element: lazyLoad(() => import('../../../cards/L04/C02/A03b')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Listen & Speak 1 : Digital Revolution Everywhere',
        },
        children: [],
      },
      {
        path: `L04-C02-A04`,
        element: lazyLoad(() => import('../../../cards/L04/C02/A04')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Listen & Speak 1 : Digital Revolution Everywhere',
        },
        children: [],
      },
    ],
  },
];

export default router;
