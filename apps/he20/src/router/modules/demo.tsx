import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const demo: IRouteObject[] = [
  {
    path: 'he20/demo',
    children: [
      {
        path: `develop`,
        element: lazyLoad(() => import('../../cards')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : New School, New Life',
        },
        children: [],
      },
      {
        path: `samples`,
        element: lazyLoad(() => import('../../samples')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : New School, New Life',
        },
        children: [],
      },
    ],
  },
];

export default demo;
