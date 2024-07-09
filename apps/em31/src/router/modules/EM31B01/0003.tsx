import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010003-30`,
        element: lazyLoad(() => import('../../../cards/B01/0003/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `B010003-40`,
        element: lazyLoad(() => import('../../../cards/B01/0003/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `B010003-50`,
        element: lazyLoad(() => import('../../../cards/B01/0003/50')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
      {
        path: `B010003-60`,
        element: lazyLoad(() => import('../../../cards/B01/0003/60')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `B010003-70`,
        element: lazyLoad(() => import('../../../cards/B01/0003/70')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
    ],
  },
];

export default router;
