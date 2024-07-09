import templates from './modules/templates';
import demo from './modules/demo';
import { default as EM41A010001 } from './modules/EM42A01/0001';

export const routers = [...EM41A010001, ...templates];

export const rootRouter = [
  {
    path: 'em42',
    children: routers,
  },
  ...demo,
];
