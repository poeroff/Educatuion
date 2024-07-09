import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L03-SP05`,
        element: lazyLoad(() => import('../../../cards/L03/SP05')),
        params: {
          ...layouts[ELayout.TERTIARY],
          subChapter: '심화학습',
        },
        children: [],
      },
    ],
  },
];

export default router;
