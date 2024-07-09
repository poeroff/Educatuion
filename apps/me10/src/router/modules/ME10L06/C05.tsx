import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L06-C05-A01`,
        element: lazyLoad(() => import('../../../cards/L06/C05/A01')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'yellow',
          subChapter: 'Before You Read',
        },
        children: [],
      },
      {
        path: `L06-C05-A02`,
        element: lazyLoad(() => import('../../../cards/L06/C05/A02')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'yellow',
          subChapter: 'Before You Read',
        },
        children: [],
      },
    ],
  },
];

export default router;
