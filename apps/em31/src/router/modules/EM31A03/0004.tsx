import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A030004-01`,
        element: lazyLoad(() => import('../../../cards/A03/0004/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `A030004-02`,
        element: lazyLoad(() => import('../../../cards/A03/0004/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `A030004-03`,
        element: lazyLoad(() => import('../../../cards/A03/0004/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `A030004-04`,
        element: lazyLoad(() => import('../../../cards/A03/0004/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `A030004-05`,
        element: lazyLoad(() => import('../../../cards/A03/0004/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `A030004-06`,
        element: lazyLoad(() => import('../../../cards/A03/0004/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `A030004-07`,
        element: lazyLoad(() => import('../../../cards/A03/0004/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `A030004-08`,
        element: lazyLoad(() => import('../../../cards/A03/0004/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
      {
        path: `A030004-09`,
        element: lazyLoad(() => import('../../../cards/A03/0004/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: `3.`,
          mainChapter: '나눗셈',
          subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
        },
        children: [],
      },
    ],
  },
];

export default router;
