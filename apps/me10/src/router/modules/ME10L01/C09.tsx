import { layouts } from '@/constants/layout';
import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L01-C09-A01`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A02`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A03`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A03a`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A03a')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A03b`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A03b')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A04`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A04')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A05`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A05')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A06`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A06')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A06a`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A06a')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A06b`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A06b')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
      {
        path: `L01-C09-A07`,
        element: lazyLoad(() => import('../../../cards/L01/C09/A07')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language Use',
          backGroundColor: 'pink',
        },
        children: [],
      },
    ],
  },
];

export default router;
