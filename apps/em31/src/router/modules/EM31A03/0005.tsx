import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A030005-01`,
        element: lazyLoad(() => import('../../../cards/A03/0005/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
      {
        path: `A030005-02`,
        element: lazyLoad(() => import('../../../cards/A03/0005/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
      {
        path: `A030005-03`,
        element: lazyLoad(() => import('../../../cards/A03/0005/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
      {
        path: `A030005-04`,
        element: lazyLoad(() => import('../../../cards/A03/0005/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
      {
        path: `A030005-05`,
        element: lazyLoad(() => import('../../../cards/A03/0005/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
      {
        path: `A030005-06`,
        element: lazyLoad(() => import('../../../cards/A03/0005/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
      {
        path: `A030005-07`,
        element: lazyLoad(() => import('../../../cards/A03/0005/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
      {
        path: `A030005-08`,
        element: lazyLoad(() => import('../../../cards/A03/0005/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
      {
        path: `A030005-09`,
        element: lazyLoad(() => import('../../../cards/A03/0005/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
      {
        path: `A030005-10`,
        element: lazyLoad(() => import('../../../cards/A03/0005/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '4. 나눗셈의 몫을 구해요',
          chapterNum: '3.',
          mainChapter: '나눗셈',
        },
        children: [],
      },
    ],
  },
];

export default router;
