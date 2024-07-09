import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B020006-40`,
        element: lazyLoad(() => import('../../../cards/B02/0006/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 직각삼각형을 알아봐요',
        },
        children: [],
      },
    ],
  },
];

export default router;
