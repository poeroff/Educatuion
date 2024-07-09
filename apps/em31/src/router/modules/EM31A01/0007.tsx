import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010007-01`,
        element: lazyLoad(() => import('../../../cards/A01/0007/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010007-02`,
        element: lazyLoad(() => import('../../../cards/A01/0007/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010007-03`,
        element: lazyLoad(() => import('../../../cards/A01/0007/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010007-04`,
        element: lazyLoad(() => import('../../../cards/A01/0007/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `A010007-05`,
        element: lazyLoad(() => import('../../../cards/A01/0007/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요 (3)',
        },
        children: [],
      },
      {
        path: `A010007-06`,
        element: lazyLoad(() => import('../../../cards/A01/0007/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010007-07`,
        element: lazyLoad(() => import('../../../cards/A01/0007/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010007-08`,
        element: lazyLoad(() => import('../../../cards/A01/0007/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010007-09`,
        element: lazyLoad(() => import('../../../cards/A01/0007/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010007-10`,
        element: lazyLoad(() => import('../../../cards/A01/0007/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '6. 세 자리 수의 뺄셈을 해요(3)',
        },
        children: [],
      },
    ],
  },
];

export default router;
