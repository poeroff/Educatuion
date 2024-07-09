import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010006-01`,
        element: lazyLoad(() => import('../../../cards/A01/0006/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010006-02`,
        element: lazyLoad(() => import('../../../cards/A01/0006/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010006-03`,
        element: lazyLoad(() => import('../../../cards/A01/0006/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010006-04`,
        element: lazyLoad(() => import('../../../cards/A01/0006/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010006-05`,
        element: lazyLoad(() => import('../../../cards/A01/0006/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요 (2)',
        },
        children: [],
      },
      {
        path: `A010006-06`,
        element: lazyLoad(() => import('../../../cards/A01/0006/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010006-07`,
        element: lazyLoad(() => import('../../../cards/A01/0006/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010006-08`,
        element: lazyLoad(() => import('../../../cards/A01/0006/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010006-09`,
        element: lazyLoad(() => import('../../../cards/A01/0006/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '5. 세 자리 수의 뺄셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010006-10`,
        element: lazyLoad(() => import('../../../cards/A01/0006/10')),
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
