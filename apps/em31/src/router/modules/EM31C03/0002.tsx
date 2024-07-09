import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';
const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `C030002-40`,
        element: lazyLoad(() => import('../../../cards/C03/0002/40')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '',
        },
        children: [],
      },
      {
        path: `C030002-41`,
        element: lazyLoad(() => import('../../../cards/C03/0002/41')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          subChapter: '',
        },
        children: [],
      },
      {
        path: `C030002-42`,
        element: lazyLoad(() => import('../../../cards/C03/0002/42')),
        params: {
          ...layouts[EMathLayout.QUATERNARY],
          chapterNum: '3.',
          mainChapter: '나눗셈',
          subChapter: '1. 나눗셈식을 알아봐요(1)',
        },
        children: [],
      },
    ],
  },
];
export default router;
