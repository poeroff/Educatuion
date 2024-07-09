import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A030006-01`,
        element: lazyLoad(() => import('../../../cards/A03/0006/01')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '함께하는 수학',
        },
        children: [],
      },
      {
        path: `A030006-02`,
        element: lazyLoad(() => import('../../../cards/A03/0006/02')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '함께하는 수학',
        },
        children: [],
      },
      {
        path: `A030006-03`,
        element: lazyLoad(() => import('../../../cards/A03/0006/03')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '함께하는 수학',
        },
        children: [],
      },
      {
        path: `A030006-04`,
        element: lazyLoad(() => import('../../../cards/A03/0006/04')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '함께하는 수학',
        },
        children: [],
      },
    ],
  },
];

export default router;
