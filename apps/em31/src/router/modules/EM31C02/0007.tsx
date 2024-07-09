import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020007-20`,
        element: lazyLoad(() => import('../../../cards/C02/0007/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 직사각형을 알아봐요',
        },
      },
    ],
  },
];

export default router;
