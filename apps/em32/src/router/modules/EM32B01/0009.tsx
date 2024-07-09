import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B020009-50`,
        element: lazyLoad(() => import('../../../cards/B02/0009/50')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '2.',
          mainChapter: '원',
          subChapter: '',
        },
        children: [],
      },
    ],
  },
];

export default router;
