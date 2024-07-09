import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020006-20`,
        element: lazyLoad(() => import('../../../cards/C02/0006/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 직각삼각형을 알아봐요',
        },
      },
    ],
  },
];

export default router;
