import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010002-01`,
        element: lazyLoad(() => import('../../../cards/A01/0002/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '1. 세자리 수의 덧셈을 해요(1)',
        },
        children: [],
      },
      {
        path: `A010002-02`,
        element: lazyLoad(() => import('../../../cards/A01/0002/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `A010002-03`,
        element: lazyLoad(() => import('../../../cards/A01/0002/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '1. 세 자리 수의 덧셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A010002-04`,
        element: lazyLoad(() => import('../../../cards/A01/0002/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '1. 세 자리 수의 덧셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A010002-05`,
        element: lazyLoad(() => import('../../../cards/A01/0002/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `A010002-06`,
        element: lazyLoad(() => import('../../../cards/A01/0002/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `A010002-07`,
        element: lazyLoad(() => import('../../../cards/A01/0002/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `A010002-08`,
        element: lazyLoad(() => import('../../../cards/A01/0002/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '1. 세 자리 수의 덧셈을 해요(1)',
        },
        children: [],
      },
      {
        path: `A010002-09`,
        element: lazyLoad(() => import('../../../cards/A01/0002/09')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
        },
        children: [],
      },
      {
        path: `A010002-10`,
        element: lazyLoad(() => import('../../../cards/A01/0002/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '1. 세 자리 수의 덧셈을 해요(1)',
        },
        children: [],
      },
    ],
  },
];

export default router;
