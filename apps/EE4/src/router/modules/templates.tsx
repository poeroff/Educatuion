import { layouts } from '@/constants/layout';
import { lazyLoad } from '@maidt-cntn/router';
import { IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const templates: IRouteObject[] = [
  {
    path: 'samples',
    element: lazyLoad(() => import('../../App')),
    children: [
      {
        path: `L01-C02-A02`,
        element: lazyLoad(() => import('../../samples/L01/C02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : New School, New Life',
        },
        children: [],
      },
    ],
  },
];

export default templates;
