import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-C03-A01`,
        element: lazyLoad(() => import('../../../cards/L02/C03/A01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: `Listen & Speak 2 : Making the Smart Choice`,
        },
        children: [],
      },
      {
        path: `L02-C03-A02`,
        element: lazyLoad(() => import('../../../cards/L02/C03/A02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: `Listen & Speak 2 : Making the Smart Choice`,
        },
        children: [],
      },
      {
        path: `L02-C03-A02a`,
        element: lazyLoad(() => import('../../../cards/L02/C03/A02a')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: `Listen & Speak 2 : Making the Smart Choice`,
        },
        children: [],
      },
      {
        path: `L02-C03-A02b`,
        element: lazyLoad(() => import('../../../cards/L02/C03/A02b')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: `Listen & Speak 2 : Making the Smart Choice`,
        },
        children: [],
      },
      {
        path: `L02-C03-A03`,
        element: lazyLoad(() => import('../../../cards/L02/C03/A03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: `Listen & Speak 2 : Making the Smart Choice`,
        },
        children: [],
      },
    ],
  },
];

export default router;
