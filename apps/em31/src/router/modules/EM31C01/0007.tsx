import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C010007-10`,
        element: lazyLoad(() => import('../../../cards/C01/0007/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010007-20`,
        element: lazyLoad(() => import('../../../cards/C01/0007/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010007-40`,
        element: lazyLoad(() => import('../../../cards/C01/0007/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010007-41`,
        element: lazyLoad(() => import('../../../cards/C01/0007/41')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010007-42`,
        element: lazyLoad(() => import('../../../cards/C01/0007/42')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010007-50`,
        element: lazyLoad(() => import('../../../cards/C01/0007/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010007-51`,
        element: lazyLoad(() => import('../../../cards/C01/0007/51')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `C010007-52`,
        element: lazyLoad(() => import('../../../cards/C01/0007/52')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
    ],
  },
];

export default router;
