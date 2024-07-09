import { default as MM10A01 } from './modules/MM10A01';

export const routers = [...MM10A01];

export const rootRouter = [
  {
    path: 'mm10',
    children: routers,
  },
];
