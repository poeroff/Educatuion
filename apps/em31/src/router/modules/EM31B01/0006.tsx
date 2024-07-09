import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010006-20`,
        element: lazyLoad(() => import('../../../cards/B01/0006/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `B010006-20`,
        element: lazyLoad(() => import('../../../cards/B01/0006/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `B010006-30`,
        element: lazyLoad(() => import('../../../cards/B01/0006/30')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `B010006-40`,
        element: lazyLoad(() => import('../../../cards/B01/0006/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `B010006-60`,
        element: lazyLoad(() => import('../../../cards/B01/0006/60')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `B010006-50`,
        element: lazyLoad(() => import('@/cards/B01/0006/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `B010006-70`,
        element: lazyLoad(() => import('../../../cards/B01/0006/70')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
    ],
  },
];

export default router;
