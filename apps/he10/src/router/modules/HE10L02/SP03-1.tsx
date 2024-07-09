import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-SP03-1`,
        element: lazyLoad(() => import('../../../cards/L02/SP03-1')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2. ',
          mainChapter: 'Open a Book, Open the World',
          subChapter: '보충학습',
        },
        children: [],
      },
    ],
  },
];

export default router;
