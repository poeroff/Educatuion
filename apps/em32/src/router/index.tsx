import demo from './modules/demo';
import templates from './modules/templates';
/* A */
import { default as EM31A010001 } from './modules/EM32A01/0001';
/* B */
import { default as EM32B020008 } from './modules/EM32B02/0008';
import { default as EM32B020009 } from './modules/EM32B01/0009';
/* C */
import { default as EM32C020001 } from './modules/EM32C02/0001';

export const routers = [...EM31A010001, ...EM32B020008, ...EM32B020009, ...EM32C020001, ...templates];

export const rootRouter = [
  {
    path: 'em32',
    children: routers,
  },
  ...demo,
];
