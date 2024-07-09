import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C010006-10`,
        element: lazyLoad(() => import('../../../cards/C01/0006/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요 (2)',
        },
      },
      {
        path: `C010006-20`,
        element: lazyLoad(() => import('../../../cards/C01/0006/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
      },
      {
        path: `C010006-40`,
        element: lazyLoad(() => import('../../../cards/C01/0006/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요 (2)',
        },
        children: [],
      },
      {
        path: `C010006-41`,
        element: lazyLoad(() => import('../../../cards/C01/0006/41')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요 (2)',
        },
        children: [],
      },
      {
        path: `C010006-42`,
        element: lazyLoad(() => import('../../../cards/C01/0006/42')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요 (2)',
        },
        children: [],
      },
      {
        path: `C010006-50`,
        element: lazyLoad(() => import('../../../cards/C01/0006/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `C010006-51`,
        element: lazyLoad(() => import('../../../cards/C01/0006/51')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `C010006-52`,
        element: lazyLoad(() => import('../../../cards/C01/0006/52')),
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
