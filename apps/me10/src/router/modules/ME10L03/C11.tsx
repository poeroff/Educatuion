import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L03-C11-A01`,
        element: lazyLoad(() => import('../../../cards/L03/C11/A01')),
        params: {
          ...layouts[ELayout.TERTIARY],
          subChapter: 'Project',
          backGroundColor: 'blue',
        },
        children: [],
      },
    ],
  },
];

export default router;
