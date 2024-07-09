import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010004-30`,
        element: lazyLoad(() => import('../../../cards/B01/0004/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '1. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `B010004-40`,
        element: lazyLoad(() => import('../../../cards/B01/0004/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: ' 3. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `B010004-50`,
        element: lazyLoad(() => import('../../../cards/B01/0004/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `B010004-60`,
        element: lazyLoad(() => import('../../../cards/B01/0004/60')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '1. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `B010004-70`,
        element: lazyLoad(() => import('../../../cards/B01/0004/70')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '1. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
    ],
  },
];

export default router;
