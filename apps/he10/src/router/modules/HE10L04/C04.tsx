import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L04-C04-A01`,
        element: lazyLoad(() => import('../../../cards/L04/C04/A01')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Plan & Present : New Report | Efforts to Make the Earth Green',
        },
        children: [],
      },
      {
        path: `L04-C04-A02`,
        element: lazyLoad(() => import('../../../cards/L04/C04/A02')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Plan & Present : News Report | Efforts to Make the Earth Green',
        },
        children: [],
      },
      {
        path: `L04-C04-A03`,
        element: lazyLoad(() => import('../../../cards/L04/C04/A03')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Plan & Present : News Report | Efforts to Make the Earth Green',
        },
        children: [],
      },
    ],
  },
];

export default router;