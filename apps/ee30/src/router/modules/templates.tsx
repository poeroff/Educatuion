import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const templates: IRouteObject[] = [
  {
    path: 'samples',
    element: lazyLoad(() => import('../../App')),
    children: [],
  },
];

export default templates;
