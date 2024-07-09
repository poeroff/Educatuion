import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L03-SP04-2`,
        element: lazyLoad(() => import('../../../cards/L03/SP04-2')),
        params: {
          ...layouts[ELayout.TERTIARY],
          chapterNum: 'Lesson 3.',
          mainChapter: 'The True Art Lovers',
          subChapter: '보충학습',
        },
        children: [],
      },
    ],
  },
];

export default router;
