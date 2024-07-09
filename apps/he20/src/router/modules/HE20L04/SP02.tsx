import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: 'L04-SP02',
        element: lazyLoad(() => import('../../../cards/L04/SP02')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 4.',
          mainChapter: 'Sink or Swim in the Digital Ocean',
          subChapter: '보충학습',
        },
        children: [],
      },
    ],
  },
];

export default router;
