import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L07-C12-A01`,
        element: lazyLoad(() => import('../../../cards/L07/C12/A01')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          subChapter: 'Wrap Up',
          backGroundColor: 'purple',
        },
        children: [],
      },
      {
        path: `L07-C12-A02`,
        element: lazyLoad(() => import('../../../cards/L07/C12/A02')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          subChapter: 'Wrap Up',
          backGroundColor: 'purple',
        },
        children: [],
      },
      {
        path: `L07-C12-A03`,
        element: lazyLoad(() => import('../../../cards/L07/C12/A03')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          subChapter: 'Wrap Up',
          backGroundColor: 'purple',
        },
        children: [],
      },
      {
        path: `L07-C12-A04`,
        element: lazyLoad(() => import('../../../cards/L07/C12/A04')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          subChapter: 'Wrap Up',
          backGroundColor: 'purple',
        },
        children: [],
      },
      {
        path: `L07-C12-A05`,
        element: lazyLoad(() => import('../../../cards/L07/C12/A05')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          subChapter: 'Wrap Up',
          backGroundColor: 'purple',
        },
        children: [],
      },
      {
        path: `L07-C12-A08`,
        element: lazyLoad(() => import('../../../cards/L07/C12/A08')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          subChapter: 'Wrap Up',
          backGroundColor: 'purple',
        },
        children: [],
      },
    ],
  },
];

export default router;
