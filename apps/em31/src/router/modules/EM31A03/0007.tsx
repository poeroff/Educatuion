import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A030007-01`,
        element: lazyLoad(() => import('../../../cards/A03/0007/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '해결하는 수학',
        },
        children: [],
      },
      {
        path: `A030007-02`,
        element: lazyLoad(() => import('../../../cards/A03/0007/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '해결하는 수학',
        },
        children: [],
      },
      {
        path: `A030007-03`,
        element: lazyLoad(() => import('../../../cards/A03/0007/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '해결하는 수학',
        },
        children: [],
      },
      {
        path: `A030007-04`,
        element: lazyLoad(() => import('../../../cards/A03/0007/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '해결하는 수학',
        },
        children: [],
      },
    ],
  },
];

export default router;
