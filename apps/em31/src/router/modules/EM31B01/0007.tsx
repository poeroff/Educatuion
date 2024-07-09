import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010007-40`,
        element: lazyLoad(() => import('../../../cards/B01/0007/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `B010007-50`,
        element: lazyLoad(() => import('../../../cards/B01/0007/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `B010007-60`,
        element: lazyLoad(() => import('../../../cards/B01/0007/60')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `B010007-70`,
        element: lazyLoad(() => import('../../../cards/B01/0007/70')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
    ],
  },
];

export default router;
