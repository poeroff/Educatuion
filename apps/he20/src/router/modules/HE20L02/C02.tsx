import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L02-C02-A01`,
        element: lazyLoad(() => import('../../../cards/L02/C02/A01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'Listen & Speak 1 : Economics for Daily Life',
        },
        children: [],
      },
      {
        path: `L02-C02-A02`,
        element: lazyLoad(() => import('../../../cards/L02/C02/A02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: 'Listen & Speak 1 : Economics for Daily Life',
        },
        children: [],
      },
      {
        path: `L02-C02-A03`,
        element: lazyLoad(() => import('../../../cards/L02/C02/A03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Lesson 2.',
          subChapter: 'Listen & Speak 1 : Economics for Daily Life',
        },
        children: [],
      },
      {
        path: `L02-C02-A03a`,
        element: lazyLoad(() => import('../../../cards/L02/C02/A03a')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Lesson 2.',
          subChapter: 'Listen & Speak 1 : Economics for Daily Life',
        },
        children: [],
      },
      {
        path: `L02-C02-A03b`,
        element: lazyLoad(() => import('../../../cards/L02/C02/A03b')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Lesson 2.',
          subChapter: 'Listen & Speak 1 : Economics for Daily Life',
        },
        children: [],
      },
      {
        path: `L02-C02-A04`,
        element: lazyLoad(() => import('../../../cards/L02/C02/A04')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Lesson 2.',
          mainChapter: 'Be a Wise Consumer',
          subChapter: 'Listen & Speak 1 : Economics for Daily Life',
        },
        children: [],
      },
    ],
  },
];

export default router;
