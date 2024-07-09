import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A010008-01`,
        element: lazyLoad(() => import('../../../cards/A01/0008/01')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '7. 어림셈을 해요',
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
        path: `A010008-02`,
        element: lazyLoad(() => import('../../../cards/A01/0008/02')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '7. 어림셈을 해요',
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
        path: `A010008-03`,
        element: lazyLoad(() => import('../../../cards/A01/0008/03')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '7. 어림셈을 해요',
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
        path: `A010008-04`,
        element: lazyLoad(() => import('../../../cards/A01/0008/04')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: '7. 어림셈을 해요',
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
        path: `A010008-05`,
        element: lazyLoad(() => import('../../../cards/A01/0008/05')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          subChapter: `7. 어림셈을 해요`,
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
        path: `A010008-06`,
        element: lazyLoad(() => import('../../../cards/A01/0008/06')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '7. 어림셈을 해요',
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
        path: `A010008-07`,
        element: lazyLoad(() => import('../../../cards/A01/0008/07')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '7. 어림셈을 해요',
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
        path: `A010008-08`,
        element: lazyLoad(() => import('../../../cards/A01/0008/08')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
    ],
  },
];

export default router;
