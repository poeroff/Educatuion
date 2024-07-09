import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L03-C09-A01`,
        element: lazyLoad(() => import('../../../cards/L03/C09/A01')),
        params: {
          ...layouts[ELayout.TERTIARY],
          subChapter: 'Write & Share',
        },
        children: [],
      },
      {
        path: `L03-C09-A02`,
        element: lazyLoad(() => import('../../../cards/L03/C09/A02')),
        params: {
          ...layouts[ELayout.TERTIARY],
          subChapter: 'Write & Share : Project Description | What an Amazing Experiment!',
        },
        children: [],
      },
      {
        path: `L03-C09-A03`,
        element: lazyLoad(() => import('../../../cards/L03/C09/A03')),
        params: {
          ...layouts[ELayout.TERTIARY],
          subChapter: 'Write & Share : Project Description | What an Amazing Experiment!',
        },
        children: [],
      },
    ],
  },
];

export default router;
