import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A050405-01`,
        element: lazyLoad(() => import('../../../cards/A05/0405/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '3. 길이를 어림해요',
        },
        children: [],
      },
      {
        path: `A050405-02`,
        element: lazyLoad(() => import('../../../cards/A05/0405/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '3. 길이를 어림해요',
        },
        children: [],
      },
      {
        path: `A050405-03`,
        element: lazyLoad(() => import('../../../cards/A05/0405/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '3. 길이를 어림해요',
        },
        children: [],
      },
      {
        path: `A050405-04`,
        element: lazyLoad(() => import('../../../cards/A05/0405/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '3. 길이를 어림해요',
        },
        children: [],
      },
      {
        path: `A050405-05`,
        element: lazyLoad(() => import('../../../cards/A05/0405/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '3. 길이를 어림해요',
        },
        children: [],
      },
      //   {
      //     path: `A050405-06`,
      //     element: lazyLoad(() => import('../../../cards/A05/0405/06')),
      //     params: {
      //       ...layouts[EMathLayout.QUINARY],
      // chapterNum: '5.',
      // mainChapter: '길이와 시간',
      // subChapter: '3. 길이를 어림해요',
      //     },
      //     children: [],
      //   },
      {
        path: `A050405-07`,
        element: lazyLoad(() => import('../../../cards/A05/0405/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '3. 길이를 어림해요',
        },
        children: [],
      },
      {
        path: `A050405-08`,
        element: lazyLoad(() => import('../../../cards/A05/0405/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '3. 길이를 어림해요',
        },
        children: [],
      },
      {
        path: `A050405-09`,
        element: lazyLoad(() => import('../../../cards/A05/0405/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '3. 길이를 어림해요',
        },
        children: [],
      },
      {
        path: `A050405-10`,
        element: lazyLoad(() => import('../../../cards/A05/0405/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '3. 길이를 어림해요',
        },
        children: [],
      },
    ],
  },
];

export default router;
