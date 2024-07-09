import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L05-C06-A01`,
        element: lazyLoad(() => import('../../../cards/L05/C06/A01')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L05-C06-A02`,
        element: lazyLoad(() => import('../../../cards/L05/C06/A02')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L05-C06-A03`,
        element: lazyLoad(() => import('../../../cards/L05/C06/A03')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L05-C06-A04`,
        element: lazyLoad(() => import('../../../cards/L05/C06/A04')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L05-C06-A05`,
        element: lazyLoad(() => import('../../../cards/L05/C06/A05')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L05-C06-A07`,
        element: lazyLoad(() => import('../../../cards/L05/C06/A07')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
      {
        path: `L05-C06-A08`,
        element: lazyLoad(() => import('../../../cards/L05/C06/A08')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Read',
          backGroundColor: 'yellow',
        },
        children: [],
      },
    ],
  },
];

export default router;
