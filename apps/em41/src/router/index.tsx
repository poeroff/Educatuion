import templates from './modules/templates';
import demo from './modules/demo';
import { default as EM41A010001 } from './modules/EM41A01/0001';
import { default as EM41B010001 } from './modules/EM41B01/0001';

export const routers = [...EM41A010001, ...EM41B010001, ...templates];

export const rootRouter = [
  {
    path: 'em41',
    children: routers,
  },
  ...demo,
];
