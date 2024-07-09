import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C010005-10`,
        element: lazyLoad(() => import('../../../cards/C01/0005/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `C010005-20`,
        element: lazyLoad(() => import('../../../cards/C01/0005/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `C010005-40`,
        element: lazyLoad(() => import('../../../cards/C01/0005/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `C010005-41`,
        element: lazyLoad(() => import('../../../cards/C01/0005/41')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `C010005-42`,
        element: lazyLoad(() => import('../../../cards/C01/0005/42')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `C010005-50`,
        element: lazyLoad(() => import('../../../cards/C01/0005/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `C010005-51`,
        element: lazyLoad(() => import('../../../cards/C01/0005/51')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `C010005-52`,
        element: lazyLoad(() => import('../../../cards/C01/0005/52')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
    ],
  },
];

export default router;
