import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B030008-10`,
        element: lazyLoad(() => import('../../../cards/B03/0008/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: ' 나눗셈',
          subChapter: '해결하는 수학',
        },
        children: [],
      },
      {
        path: `B030008-20`,
        element: lazyLoad(() => import('../../../cards/B03/0008/20')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '3.',
          mainChapter: ' 나눗셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `B030008-30`,
        element: lazyLoad(() => import('../../../cards/B03/0008/30')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '3.',
          mainChapter: ' 나눗셈',
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `B030008-40`,
        element: lazyLoad(() => import('../../../cards/B03/0008/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '',
        },
        children: [],
      },
      {
        path: `B030008-50`,
        element: lazyLoad(() => import('../../../cards/B03/0008/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '',
        },
        children: [],
      },
    ],
  },
];

export default router;
