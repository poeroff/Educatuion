import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B020007-40`,
        element: lazyLoad(() => import('../../../cards/B02/0007/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 직사각형을 알아봐요',
        },
        children: [],
      },
      {
        path: `B020007-60`,
        element: lazyLoad(() => import('../../../cards/B02/0007/60')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 직사각형을 알아봐요',
        },
        children: [],
      },
    ],
  },
];

export default router;
