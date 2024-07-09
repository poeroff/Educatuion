import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const templates: IRouteObject[] = [
  {
    path: 'samples',
    element: lazyLoad(() => import('../../App')),
    children: [
      {
        path: `HM-000-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-000-01')),
        params: {
          ...layouts[ELayout.INTRO],
          // subChapter: '',
        },
        children: [],
      },
    ],
  },
];

export default templates;
