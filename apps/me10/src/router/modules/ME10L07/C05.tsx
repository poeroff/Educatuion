import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L07-C05-A01`,
        element: lazyLoad(() => import('../../../cards/L07/C05/A01')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          backGroundColor: 'yellow',
          subChapter: 'Before You Read',
        },
        children: [],
      },
      {
        path: `L07-C05-A02`,
        element: lazyLoad(() => import('../../../cards/L07/C05/A02')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          backGroundColor: 'yellow',
          subChapter: 'Before You Read',
        },
        children: [],
      },
      {
        path: `L07-C05-A03`,
        element: lazyLoad(() => import('../../../cards/L07/C05/A03')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          backGroundColor: 'yellow',
          subChapter: 'Before You Read',
        },
        children: [],
      },
    ],
  },
];

export default router;
