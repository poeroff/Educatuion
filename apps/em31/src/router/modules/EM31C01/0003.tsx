import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C010003-10`,
        element: lazyLoad(() => import('../../../cards/C01/0003/10')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `C010003-20`,
        element: lazyLoad(() => import('../../../cards/C01/0003/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `C010003-50`,
        element: lazyLoad(() => import('../../../cards/C01/0003/50')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
      {
        path: `C010003-51`,
        element: lazyLoad(() => import('../../../cards/C01/0003/51')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
      {
        path: `C010003-52`,
        element: lazyLoad(() => import('../../../cards/C01/0003/52')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
      {
        path: `C010003-40`,
        element: lazyLoad(() => import('../../../cards/C01/0003/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `C010003-41`,
        element: lazyLoad(() => import('../../../cards/C01/0003/41')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `C010003-42`,
        element: lazyLoad(() => import('../../../cards/C01/0003/42')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
    ],
  },
];

export default router;
