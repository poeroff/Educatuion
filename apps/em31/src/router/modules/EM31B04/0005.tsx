import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B040005-50`,
        element: lazyLoad(() => import('../../../cards/B04/0005/50')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          mainChapter: '곱셈',
          chapterNum: '4.',
          subChapter: '5. (두자리 수)x(한자리 수)를 계산해요(4)',
        },
        children: [],
      },
    ],
  },
];

export default router;
