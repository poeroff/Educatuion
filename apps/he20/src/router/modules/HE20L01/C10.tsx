import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-C10-A01`,
        element: lazyLoad(() => import('../../../cards/L01/C10/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Project +Culture : Public Service Announcements for a Better World',
        },
        children: [],
      },
      {
        path: `L01-C10-A02`,
        element: lazyLoad(() => import('../../../cards/L01/C10/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Project +Culture : Public Service Announcements for a Better World',
        },
        children: [],
      },
    ],
  },
];

export default router;
