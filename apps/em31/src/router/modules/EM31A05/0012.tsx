import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A050012-01`,
        element: lazyLoad(() => import('../../../cards/A05/0012/01')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `A050012-02`,
        element: lazyLoad(() => import('../../../cards/A05/0012/02')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `A050012-03`,
        element: lazyLoad(() => import('../../../cards/A05/0012/03')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `A050012-04`,
        element: lazyLoad(() => import('../../../cards/A05/0012/04')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `A050012-05`,
        element: lazyLoad(() => import('../../../cards/A05/0012/05')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
    ],
  },
];

export default router;
