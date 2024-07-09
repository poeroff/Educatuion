import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L03-C01-A01`,
        element: lazyLoad(() => import('../../../cards/L03/C01/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 3.',
          mainChapter: 'Free Yourself with Science',
        },
        children: [],
      },
    ],
  },
];

export default router;
