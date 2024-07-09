import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010009-01`,
        element: lazyLoad(() => import('../../../cards/A01/0009/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '함께하는 수학',
        },
        children: [],
      },
      {
        path: `A010009-02`,
        element: lazyLoad(() => import('../../../cards/A01/0009/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '함께하는 수학',
        },
        children: [],
      },
      {
        path: `A010009-03`,
        element: lazyLoad(() => import('../../../cards/A01/0009/03')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '함께하는 수학',
        },
        children: [],
      },
      {
        path: `A010009-04`,
        element: lazyLoad(() => import('../../../cards/A01/0009/04')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '함께하는 수학',
        },
        children: [],
      },
    ],
  },
];

export default router;
