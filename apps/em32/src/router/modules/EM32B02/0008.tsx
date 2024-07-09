import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B020008-10`,
        element: lazyLoad(() => import('../../../cards/B02/0008/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2.',
          mainChapter: ' 원',
          subChapter: '해결하는 수학',
        },
        children: [],
      },
    ],
  },
];

export default router;
