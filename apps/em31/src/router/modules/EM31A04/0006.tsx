import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `A040006-04`,
        element: lazyLoad(() => import('../../../cards/A04/0006/04')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          subChapter: '2. (두 자리 수) × (한 자리 수)를 계산해요(5)',
        },
        children: [],
      },
      {
        path: `A040006-05`,
        element: lazyLoad(() => import('../../../cards/A04/0006/05')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '4.',
          subChapter: '2. (두 자리 수) × (한 자리 수)를 계산해요(5)',
        },
        children: [],
      },
    ],
  },
];

export default router;
