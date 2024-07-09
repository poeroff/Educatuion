import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-C09-A01`,
        element: lazyLoad(() => import('../../../cards/L02/C09/A01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'Write & Share',
        },
        children: [],
      },
      {
        path: `L02-C09-A02`,
        element: lazyLoad(() => import('../../../cards/L02/C09/A02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'Write & Share : Request E-mail | Dear Customer Service',
        },
        children: [],
      },
      {
        path: `L02-C09-A03`,
        element: lazyLoad(() => import('../../../cards/L02/C09/A03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'Write & Share : Request E-mail | Dear Customer Service',
        },
        children: [],
      },
    ],
  },
];

export default router;
