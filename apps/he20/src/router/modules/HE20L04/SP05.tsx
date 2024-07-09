import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L04-SP05`,
        element: lazyLoad(() => import('../../../cards/L04/SP05')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: '심화 학습',
        },
        children: [],
      },
    ],
  },
];

export default router;
