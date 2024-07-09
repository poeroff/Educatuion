import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-C10-A01`,
        element: lazyLoad(() => import('../../../cards/L02/C10/A01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'Project +Culture : The Stories of the People on Our Money',
        },
        children: [],
      },
      {
        path: `L02-C10-A02`,
        element: lazyLoad(() => import('../../../cards/L02/C10/A02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'Project +Culture : The Stories of the People on Our Money',
        },
        children: [],
      },
    ],
  },
];

export default router;
