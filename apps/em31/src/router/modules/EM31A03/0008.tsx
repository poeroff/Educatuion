import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A030008-01`,
        element: lazyLoad(() => import('../../../cards/A03/0008/01')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
          backGroundColor: 'brown',
        },
        children: [],
      },
      {
        path: `A030008-02`,
        element: lazyLoad(() => import('../../../cards/A03/0008/02')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
          backGroundColor: 'brown',
        },
        children: [],
      },
      {
        path: `A030008-03`,
        element: lazyLoad(() => import('../../../cards/A03/0008/03')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
          backGroundColor: 'brown',
        },
        children: [],
      },
      {
        path: `A030008-04`,
        element: lazyLoad(() => import('../../../cards/A03/0008/04')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
          backGroundColor: 'brown',
        },
        children: [],
      },
      {
        path: `A030008-06`,
        element: lazyLoad(() => import('../../../cards/A03/0008/06')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '문제로 마무리',
          backGroundColor: 'brown',
        },
        children: [],
      },
    ],
  },
];

export default router;
