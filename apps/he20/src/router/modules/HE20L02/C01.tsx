import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-C01-A01`,
        element: lazyLoad(() => import('../../../cards/L02/C01/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2.',
          mainChapter: 'Be a Wise Consumer',
        },
        children: [],
      },
    ],
  },
];

export default router;
