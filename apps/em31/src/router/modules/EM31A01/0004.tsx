import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010004-01`,
        element: lazyLoad(() => import('../../../cards/A01/0004/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010004-02`,
        element: lazyLoad(() => import('../../../cards/A01/0004/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '3. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010004-03`,
        element: lazyLoad(() => import('../../../cards/A01/0004/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010004-04`,
        element: lazyLoad(() => import('../../../cards/A01/0004/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010004-05`,
        element: lazyLoad(() => import('../../../cards/A01/0004/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010004-06`,
        element: lazyLoad(() => import('../../../cards/A01/0004/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010004-07`,
        element: lazyLoad(() => import('../../../cards/A01/0004/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },

      {
        path: `A010004-08`,
        element: lazyLoad(() => import('../../../cards/A01/0004/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010004-09`,
        element: lazyLoad(() => import('../../../cards/A01/0004/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
      {
        path: `A010004-10`,
        element: lazyLoad(() => import('../../../cards/A01/0004/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '3. 세 자리 수의 덧셈을 해요(3)',
        },
        children: [],
      },
    ],
  },
];

export default router;
