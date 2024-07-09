import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L06-C02-A01`,
        element: lazyLoad(() => import('../../../cards/L06/C02/A01')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L06-C02-A02`,
        element: lazyLoad(() => import('../../../cards/L06/C02/A02')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L06-C02-A03`,
        element: lazyLoad(() => import('../../../cards/L06/C02/A03')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L06-C02-A04`,
        element: lazyLoad(() => import('../../../cards/L06/C02/A04')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L06-C02-A05`,
        element: lazyLoad(() => import('../../../cards/L06/C02/A05')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L06-C02-A06`,
        element: lazyLoad(() => import('../../../cards/L06/C02/A06')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L06-C02-A07`,
        element: lazyLoad(() => import('../../../cards/L06/C02/A07')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
      {
        path: `L06-C02-A09`,
        element: lazyLoad(() => import('../../../cards/L06/C02/A09')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'green',
          subChapter: 'Communicate',
        },
        children: [],
      },
    ],
  },
];

export default router;
