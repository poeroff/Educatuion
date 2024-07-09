import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L07-C08-A01`,
        element: lazyLoad(() => import('../../../cards/L07/C08/A01')),
        params: {
          ...layouts[ELayout.SEPTENARY],
          subChapter: 'Across Cultures',
          backGroundColor: 'yellow',
        },
        children: [],
      },
    ],
  },
];

export default router;
