import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A040009-01`,
        element: lazyLoad(() => import('../../../cards/A04/0009/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `A040009-02`,
        element: lazyLoad(() => import('../../../cards/A04/0009/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `A040009-03`,
        element: lazyLoad(() => import('../../../cards/A04/0009/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `A040009-04`,
        element: lazyLoad(() => import('../../../cards/A04/0009/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `A040009-06`,
        element: lazyLoad(() => import('../../../cards/A04/0009/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '4.',
          mainChapter: '곱셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
    ],
  },
];

export default router;
