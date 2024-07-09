import templates from './modules/templates';
import demo from './modules/demo';
import { default as HM31A01 } from './modules/HM31A01/0001';

export const routers = [...HM31A01, ...templates];

export const rootRouter = [
  {
    path: 'hm11',
    children: routers,
  },
  ...demo,
];
