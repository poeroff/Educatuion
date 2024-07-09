import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: 'L01-SP01-2',
        element: lazyLoad(() => import('../../../cards/L01/SP01-2')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 1.',
          mainChapter: 'We Share, We Care',
          subChapter: '보충학습',
        },
        children: [],
      },
    ],
  },
];

export default router;
