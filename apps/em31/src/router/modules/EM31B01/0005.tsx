import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010005-30`,
        element: lazyLoad(() => import('../../../cards/B01/0005/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 덧셈을 해요(1)',
        },
        children: [],
      },
      {
        path: `B010005-40`,
        element: lazyLoad(() => import('../../../cards/B01/0005/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `B010005-50`,
        element: lazyLoad(() => import('../../../cards/B01/0005/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요(1)',
        },
        children: [],
      },
      {
        path: `B010005-60`,
        element: lazyLoad(() => import('../../../cards/B01/0005/60')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 덧셈을 해요(1)',
        },
        children: [],
      },
      {
        path: `B010005-70`,
        element: lazyLoad(() => import('../../../cards/B01/0005/70')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '1. 세 자리 수의 덧셈을 해요(1)',
        },
        children: [],
      },
    ],
  },
];

export default router;
