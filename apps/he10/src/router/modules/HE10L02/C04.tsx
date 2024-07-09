import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-C04-A01`,
        element: lazyLoad(() => import('../../../cards/L02/C04/A01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'Plan & Present : Interview | Time with a Writer',
        },
      },
      {
        path: `L02-C04-A02`,
        element: lazyLoad(() => import('../../../cards/L02/C04/A02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          mainChapter: 'Open a Book, Open the World',
          subChapter: 'Plan & Present : Interview | Time with a Writer',
        },
      },
      {
        path: `L02-C04-A03`,
        element: lazyLoad(() => import('../../../cards/L02/C04/A03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          mainChapter: 'Open a Book, Open the World',
          subChapter: 'Plan & Present : Interview | Time with a Writer',
          minorChapter: '',
        },
        children: [],
      },
    ],
  },
];

export default router;
