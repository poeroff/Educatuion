import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { layouts } from '@/constants/layout';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020001-10`,
        element: lazyLoad(() => import('../../../cards/C02/0001/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2. 평면도형',
          mainChapter: '',
          subChapter: '배운 내용',
        },
        children: [],
      },
    ],
  },
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020001-11`,
        element: lazyLoad(() => import('../../../cards/C02/0001/11')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2. 평면도형',
          mainChapter: '',
          subChapter: '배운 내용',
        },
        children: [],
      },
    ],
  },
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020001-12`,
        element: lazyLoad(() => import('../../../cards/C02/0001/12')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2. 평면도형',
          mainChapter: '',
          subChapter: '배운 내용',
        },
        children: [],
      },
    ],
  },
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020001-20`,
        element: lazyLoad(() => import('../../../cards/C02/0001/20')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2. 평면도형',
          mainChapter: '',
          subChapter: '배운 내용',
        },
        children: [],
      },
    ],
  },
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020001-21`,
        element: lazyLoad(() => import('../../../cards/C02/0001/21')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2. 평면도형',
          mainChapter: '',
          subChapter: '배운 내용',
        },
        children: [],
      },
    ],
  },
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020001-22`,
        element: lazyLoad(() => import('../../../cards/C02/0001/22')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2. 평면도형',
          mainChapter: '',
          subChapter: '배운 내용',
        },
        children: [],
      },
    ],
  },
];

export default router;
