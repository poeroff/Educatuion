import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020004-10`,
        element: lazyLoad(() => import('../../../cards/C02/0004/10')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '2. ',
          mainChapter: '평면도형',
          subChapter: '3. 각을 알아봐요',
        },
        children: [],
      },
    ],
  },
];

export default router;
