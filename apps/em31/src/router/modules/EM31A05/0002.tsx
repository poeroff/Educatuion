import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A050002-01`,
        element: lazyLoad(() => import('../../../cards/A05/0002/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '1. mm를 알아봐요',
        },
        children: [],
      },
      {
        path: `A050002-02`,
        element: lazyLoad(() => import('../../../cards/A05/0002/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '1. mm를 알아봐요',
        },
        children: [],
      },
      {
        path: `A050002-03`,
        element: lazyLoad(() => import('../../../cards/A05/0002/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '1. mm를 알아봐요',
        },
        children: [],
      },
      {
        path: `A050002-04`,
        element: lazyLoad(() => import('../../../cards/A05/0002/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '1. mm를 알아봐요',
        },
        children: [],
      },
      {
        path: `A050002-05`,
        element: lazyLoad(() => import('../../../cards/A05/0002/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '1. mm를 알아봐요',
        },
        children: [],
      },
      // TODO : 설계 확정 전
      // {
      //   path: `A050002-06`,
      //   element: lazyLoad(() => import('../../../cards/A05/0002/06')),
      //   params: {
      //     ...layouts[EMathLayout.QUINARY],
      //     chapterNum: '5.',
      //     mainChapter: '길이와 시간',
      //     subChapter: '1. mm를 알아봐요',
      //   },
      //   children: [],
      // },
      {
        path: `A050002-07`,
        element: lazyLoad(() => import('../../../cards/A05/0002/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '1. mm를 알아봐요',
        },
        children: [],
      },
      {
        path: `A050002-08`,
        element: lazyLoad(() => import('../../../cards/A05/0002/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '1. mm를 알아봐요',
        },
        children: [],
      },
      {
        path: `A050002-09`,
        element: lazyLoad(() => import('../../../cards/A05/0002/09')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '1. mm를 알아봐요',
        },
        children: [],
      },
      {
        path: `A050002-10`,
        element: lazyLoad(() => import('../../../cards/A05/0002/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '5.',
          mainChapter: '길이와 시간',
          subChapter: '1. mm를 알아봐요',
        },
        children: [],
      },
    ],
  },
];

export default router;
