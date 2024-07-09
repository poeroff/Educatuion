import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B020002-70`,
        element: lazyLoad(() => import('../../../cards/B02/0002/70')),
        params: {
          ...layouts[EMathLayout.INTRO],
          chapterNum: '2.',
          mainChapter: '\u00A0평면도형',
          subChapter: '1. 선을 분류해요',
        },
        children: [],
      },
    ],
  },
];

export default router;
