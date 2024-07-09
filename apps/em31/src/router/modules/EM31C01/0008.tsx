import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C010008-10`,
        element: lazyLoad(() => import('../../../cards/C01/0008/10')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `C010008-20`,
        element: lazyLoad(() => import('../../../cards/C01/0008/20')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `C010008-50`,
        element: lazyLoad(() => import('../../../cards/C01/0008/50')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `C010008-51`,
        element: lazyLoad(() => import('../../../cards/C01/0008/51')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `C010008-52`,
        element: lazyLoad(() => import('../../../cards/C01/0008/52')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `C010008-53`,
        element: lazyLoad(() => import('../../../cards/C01/0008/53')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `C010008-54`,
        element: lazyLoad(() => import('../../../cards/C01/0008/54')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `C010008-55`,
        element: lazyLoad(() => import('../../../cards/C01/0008/55')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `C010008-56`,
        element: lazyLoad(() => import('../../../cards/C01/0008/56')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
    ],
  },
];

export default router;
