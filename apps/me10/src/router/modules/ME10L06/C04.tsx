import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L06-C04-A01`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A01')),
        params: {
          ...layouts[ELayout.SENARY],
          subChapter: 'Time to Present',
          backGroundColor: 'green',
        },
        children: [],
      },
      {
        path: `L06-C04-A02`,
        element: lazyLoad(() => import('../../../cards/L06/C04/A02')),
        params: {
          ...layouts[ELayout.SENARY],
          subChapter: 'Time to Present',
          backGroundColor: 'green',
        },
        children: [],
      },
    ],
  },
];

export default router;
