import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C010004-10`,
        element: lazyLoad(() => import('../../../cards/C01/0004/10')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '3. 세 자리 수의 덧셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010004-20`,
        element: lazyLoad(() => import('../../../cards/C01/0004/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세 자리 수의 덧셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010004-40`,
        element: lazyLoad(() => import('../../../cards/C01/0004/40')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '3. 세 자리 수의 덧셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010004-41`,
        element: lazyLoad(() => import('../../../cards/C01/0004/41')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '3. 세 자리 수의 덧셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010004-42`,
        element: lazyLoad(() => import('../../../cards/C01/0004/42')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '3. 세 자리 수의 덧셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010004-50`,
        element: lazyLoad(() => import('../../../cards/C01/0004/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세 자리 수의 덧셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010004-51`,
        element: lazyLoad(() => import('../../../cards/C01/0004/51')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세 자리 수의 덧셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010004-52`,
        element: lazyLoad(() => import('../../../cards/C01/0004/52')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세 자리 수의 덧셈을 해요 (3)',
        },
        children: [],
      },
    ],
  },
];

export default router;
