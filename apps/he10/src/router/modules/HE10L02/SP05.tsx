import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-SP05`,
        element: lazyLoad(() => import('../../../cards/L02/SP05')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2. ',
          mainChapter: 'Open a Book, Open the World',
          subChapter: '심화학습',
        },
        children: [],
      },
    ],
  },
];

export default router;
