import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010003-01`,
        element: lazyLoad(() => import('../../../cards/A01/0003/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010003-02`,
        element: lazyLoad(() => import('../../../cards/A01/0003/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010003-03`,
        element: lazyLoad(() => import('../../../cards/A01/0003/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010003-04`,
        element: lazyLoad(() => import('../../../cards/A01/0003/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010003-07`,
        element: lazyLoad(() => import('../../../cards/A01/0003/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요 (2)',
        },
        children: [],
      },
      {
        path: `A010003-05`,
        element: lazyLoad(() => import('../../../cards/A01/0003/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010003-06`,
        element: lazyLoad(() => import('../../../cards/A01/0003/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010003-08`,
        element: lazyLoad(() => import('../../../cards/A01/0003/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
      {
        path: `A010003-09`,
        element: lazyLoad(() => import('../../../cards/A01/0003/09')),
        params: {
          ...layouts[EMathLayout.TERTIARY],
        },
        children: [],
      },
      {
        path: `A010003-10`,
        element: lazyLoad(() => import('../../../cards/A01/0003/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
        },
        children: [],
      },
    ],
  },
];

export default router;
