import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L06-C03-A01`,
        element: lazyLoad(() => import('../../../cards/L06/C03/A01')),
        params: {
          ...layouts[ELayout.SENARY],
          subChapter: 'Talk to Play',
          backGroundColor: 'green',
        },
        children: [],
      },
      {
        path: `L06-C03-A02`,
        element: lazyLoad(() => import('../../../cards/L06/C03/A02')),
        params: {
          ...layouts[ELayout.SENARY],
          subChapter: 'Talk to Play',
          backGroundColor: 'green',
        },
        children: [],
      },
    ],
  },
];

export default router;
