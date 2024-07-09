import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { templates_em31 } from './templates_em31';
import { templates_em32 } from './templates_em32';

const templates: IRouteObject[] = [
  {
    path: 'samples',
    element: lazyLoad(() => import('../../App')),
    children: [...templates_em31, ...templates_em32],
  },
];

export default templates;
