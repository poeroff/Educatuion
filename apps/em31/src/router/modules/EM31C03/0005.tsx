import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C030005-40`,
        element: lazyLoad(() => import('../../../cards/C03/0005/40')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },
      {
        path: `C030005-41`,
        element: lazyLoad(() => import('../../../cards/C03/0005/41')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },
      {
        path: `C030005-42`,
        element: lazyLoad(() => import('../../../cards/C03/0005/42')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },
      {
        path: `C030005-50`,
        element: lazyLoad(() => import('../../../cards/C03/0005/50')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },
      {
        path: `C030005-51`,
        element: lazyLoad(() => import('../../../cards/C03/0005/51')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },
      {
        path: `C030005-52`,
        element: lazyLoad(() => import('../../../cards/C03/0005/52')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '4. 나눗셈의 몫을 구해요',
        },
        children: [],
      },
    ],
  },
];

export default router;
