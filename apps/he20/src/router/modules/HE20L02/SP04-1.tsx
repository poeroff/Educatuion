import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-SP04-1`,
        element: lazyLoad(() => import('../../../cards/L02/SP04-1')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2.',
          mainChapter: 'Be a Wise Consumer',
          subChapter: '보충학습',
        },
        children: [],
      },
    ],
  },
];

export default router;
