import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010010-10`,
        element: lazyLoad(() => import('../../../cards/B01/0010/10')),
        params: {
          ...layouts[EMathLayout.TERTIARY],
          chapterNum: '1.',
          mainChapter: '덧셈과 뺄셈',
          subChapter: '해결하는 수학',
        },
        children: [],
      },
    ],
  },
];

export default router;
