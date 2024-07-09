import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L07-C10-A01`,
        element: lazyLoad(() => import('../../../cards/L07/C10/A01')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          subChapter: 'Think and Write',
          backGroundColor: 'blue',
        },
        children: [],
      },
    ],
  },
];

export default router;
