import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L05-C09-A01`,
        element: lazyLoad(() => import('../../../cards/L05/C09/A01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L05-C09-A02`,
        element: lazyLoad(() => import('../../../cards/L05/C09/A02')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L05-C09-A03`,
        element: lazyLoad(() => import('../../../cards/L05/C09/A03')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L05-C09-A05`,
        element: lazyLoad(() => import('../../../cards/L05/C09/A05')),
        params: {
          ...layouts[ELayout.QUINARY],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
    ],
  },
];

export default router;
