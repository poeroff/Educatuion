import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';
const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C010011-10`,
        element: lazyLoad(() => import('../../../cards/C01/0011/10')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '',
        },
        children: [],
      },
      {
        path: `C010011-20`,
        element: lazyLoad(() => import('../../../cards/C01/0011/20')),
        params: {
          ...layouts[EMathLayout.INTRO],
        },
        children: [],
      },
      {
        path: `C010011-30`,
        element: lazyLoad(() => import('../../../cards/C01/0011/30')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C010011-31`,
        element: lazyLoad(() => import('../../../cards/C01/0011/31')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C010011-32`,
        element: lazyLoad(() => import('../../../cards/C01/0011/32')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C010011-33`,
        element: lazyLoad(() => import('../../../cards/C01/0011/33')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C010011-34`,
        element: lazyLoad(() => import('../../../cards/C01/0011/34')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C010011-35`,
        element: lazyLoad(() => import('../../../cards/C01/0011/35')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '문제로 마무리',
        },
        children: [],
      },
      {
        path: `C010011-36`,
        element: lazyLoad(() => import('../../../cards/C01/0011/36')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '문제로 마무리',
        },
        children: [],
      },
    ],
  },
];
export default router;
