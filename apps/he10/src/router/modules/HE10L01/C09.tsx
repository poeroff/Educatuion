import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-C09-A01`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Write & Share',
        },
        children: [],
      },
      {
        path: `L01-C09-A02`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: "Write & Share: Letter of Advice | Don't Worry, Be Happy",
        },
        children: [],
      },
      {
        path: `L01-C09-A03`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: "Write & Share: Letter of Advice | Don't Worry, Be Happy",
        },
        children: [],
      },
    ],
  },
];

export default router;
