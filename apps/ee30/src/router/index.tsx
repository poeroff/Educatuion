import demo from './modules/demo';
import templates from './modules/templates';

/* Lesson 1 */
import { default as EE30L01C01 } from './modules/EE30L01/C01';

export const routers = [...EE30L01C01, ...templates];

export const rootRouter = [
  {
    path: 'ee30',
    children: routers,
  },
  ...demo,
];
