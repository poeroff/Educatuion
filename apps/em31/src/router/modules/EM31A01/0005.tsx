import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010005-01`,
        element: lazyLoad(() => import('../../../cards/A01/0005/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요(1)',
        },
        children: [],
      },
      {
        path: `A010005-02`,
        element: lazyLoad(() => import('../../../cards/A01/0005/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '4. 세 자리 수의 뺄셈을 해요(1)',
        },
        children: [],
      },
      {
        path: `A010005-03`,
        element: lazyLoad(() => import('../../../cards/A01/0005/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A010005-04`,
        element: lazyLoad(() => import('../../../cards/A01/0005/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A010005-05`,
        element: lazyLoad(() => import('../../../cards/A01/0005/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A010005-06`,
        element: lazyLoad(() => import('../../../cards/A01/0005/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A010005-07`,
        element: lazyLoad(() => import('../../../cards/A01/0005/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A010005-08`,
        element: lazyLoad(() => import('../../../cards/A01/0005/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요(1)',
        },
        children: [],
      },
      {
        path: `A010005-09`,
        element: lazyLoad(() => import('../../../cards/A01/0005/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
        },
        children: [],
      },
      {
        path: `A010005-10`,
        element: lazyLoad(() => import('../../../cards/A01/0005/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 세 자리 수의 뺄셈을 해요(1)',
        },
        children: [],
      },
    ],
  },
];

export default router;
