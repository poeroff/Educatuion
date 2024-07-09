import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010008-40`,
        element: lazyLoad(() => import('../../../cards/B01/0008/40')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `B010008-60`,
        element: lazyLoad(() => import('../../../cards/B01/0008/60')),
        params: {
          ...layouts[EMathLayout.INTRO],
          subChapter: '7. 어림셈을 해요',
        },
        children: [],
      },
      {
        path: `B010008-70`,
        element: lazyLoad(() => import('../../../cards/B01/0008/70')),
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
