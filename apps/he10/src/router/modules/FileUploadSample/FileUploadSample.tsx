import { IRouteObject, lazyLoad } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';
import { layouts } from '@/constants/layout';

const router: IRouteObject[] = [
  {
    path: '',
    element: lazyLoad(() => import('../../../App')),
    children: [
      {
        path: 'FileUploadSample',
        element: lazyLoad(() => import('../../../cards/FileUploadSampleCard/C01/A01/01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
    ],
  },
];

export default router;
