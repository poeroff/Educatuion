import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L04-C10-A01`,
        element: lazyLoad(() => import('../../../cards/L04/C10/A01')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Project +Culture : Green Policies Around the World',
        },
        children: [],
      },
      {
        path: `L04-C10-A02`,
        element: lazyLoad(() => import('../../../cards/L04/C10/A02')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Project +Culture : Green Policies Around the World',
        },
        children: [],
      },
    ],
  },
];

export default router;
