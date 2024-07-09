import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L04-C05-A01`,
        element: lazyLoad(() => import('../../../cards/L04/C05/A01')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Before You Read',
        },
      },
      {
        path: `L04-C05-A02`,
        element: lazyLoad(() => import('../../../cards/L04/C05/A02')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Before You Read',
        },
      },
      {
        path: `L04-C05-A03`,
        element: lazyLoad(() => import('../../../cards/L04/C05/A03')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Plan & Present : New Report | Efforts to Make the Earth Green',
        },
      },
      {
        path: `L04-C05-A04`,
        element: lazyLoad(() => import('../../../cards/L04/C05/A04')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Before You Read',
        },
      },
    ],
  },
];

export default router;
