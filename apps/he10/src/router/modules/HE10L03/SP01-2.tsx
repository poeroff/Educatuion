import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L03-SP01-2`,
        element: lazyLoad(() => import('../../../cards/L03/SP01-2')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 3.',
          mainChapter: 'Free Yourself with Science',
          subChapter: '보충학습',
        },
        children: [],
      },
    ],
  },
];

export default router;