import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010011-20`,
        element: lazyLoad(() => import('../../../cards/B01/0011/20')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter:'',
        },
        children: [],
      },
      {
        path: `B010011-30`,
        element: lazyLoad(() => import('../../../cards/B01/0011/30')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter:'',
        },
        children: [],
      },
      {
        path: `B010011-40`,
        element: lazyLoad(() => import('../../../cards/B01/0011/40')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter:'',
        },
        children: [],
      },
      {
        path: `B010011-50`,
        element: lazyLoad(() => import('../../../cards/B01/0011/50')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '',
        },
        children: [],
      },
      
    ],
  },
];

export default router;
