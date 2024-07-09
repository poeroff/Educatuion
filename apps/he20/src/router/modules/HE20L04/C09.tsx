import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: `L04-C09-A01`,
        element: lazyLoad(() => import('../../../cards/L04/C09/A01')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Write & Share',
        },
        children: [],
      },
      {
        path: `L04-C09-A02`,
        element: lazyLoad(() => import('../../../cards/L04/C09/A02')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Write & Share : Persuasive Paragraph | How to Be a Good Digital Citizen',
        },
        children: [],
      },
      {
        path: `L04-C09-A03`,
        element: lazyLoad(() => import('../../../cards/L04/C09/A03')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: 'Write & Share : Persuasive Paragraph | How to Be a Good Digital Citizen',
        },
        children: [],
      },
    ],
  },
];

export default router;
