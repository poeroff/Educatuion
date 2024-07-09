import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C030003-42`,
        element: lazyLoad(() => import('../../../cards/C03/0003/42')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '2. 나눗셈식을 알아봐요(2)',
        },
        children: [],
      },
    ],
  },
];

export default router;
