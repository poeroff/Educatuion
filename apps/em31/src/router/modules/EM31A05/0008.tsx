import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A050008-01`,
        element: lazyLoad(() => import('../../../cards/A05/0008/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: ' 5. 시간의 덧셈과 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A050008-02`,
        element: lazyLoad(() => import('../../../cards/A05/0008/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: ' 5. 시간의 덧셈과 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A050008-03`,
        element: lazyLoad(() => import('../../../cards/A05/0008/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: ' 5. 시간의 덧셈과 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A050008-04`,
        element: lazyLoad(() => import('../../../cards/A05/0008/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: ' 5. 시간의 덧셈과 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A050008-05`,
        element: lazyLoad(() => import('../../../cards/A05/0008/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: ' 5. 시간의 덧셈과 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A050008-06`,
        element: lazyLoad(() => import('../../../cards/A05/0008/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: ' 5. 시간의 덧셈과 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A050008-07`,
        element: lazyLoad(() => import('../../../cards/A05/0008/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: ' 5. 시간의 덧셈과 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A050008-08`,
        element: lazyLoad(() => import('../../../cards/A05/0008/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: ' 5. 시간의 덧셈과 뺄셈을 해요 (1)',
        },
        children: [],
      },
      {
        path: `A050008-09`,
        element: lazyLoad(() => import('../../../cards/A05/0008/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: ' 5. 시간의 덧셈과 뺄셈을 해요 (1)',
        },
        children: [],
      },
    ],
  },
];

export default router;
