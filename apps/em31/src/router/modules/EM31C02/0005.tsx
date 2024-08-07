import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C020005-10`,
        element: lazyLoad(() => import('../../../cards/C02/0005/10')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '2. ',
          mainChapter: '평면도형',
          subChapter: '4. 직각을 알아봐요',
        },
        children: [],
      },
    ],
  },
];

export default router;
