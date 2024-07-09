import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `B010001-00`,
        element: lazyLoad(() => import('../../../cards/B01/0001/00')),
        params: {
          ...layouts[EMathLayout.QUINARY],
          chapterNum: '',
          mainChapter: '4학년 진단평가',
          subChapter: '',
        },
        children: [],
      },
    ],
  },
];

export default router;
