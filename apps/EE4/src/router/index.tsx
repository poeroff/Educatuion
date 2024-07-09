import { default as demo } from './modules/demo';

import { default as EE40L04C01 } from './modules/EE40L04/C01';
import { default as EE40L04C02 } from './modules/EE40L04/C02';
import { default as EE40L04C03 } from './modules/EE40L04/C03';

import { default as EE4L05C01 } from './modules/EE4L05/C01';
import { default as EE4L05C02 } from './modules/EE4L05/C02';
import { default as EE4L05C03 } from './modules/EE4L05/C03';

import { default as EE4L06C01 } from './modules/EE4L06/C01';
import { default as EE4L06C02 } from './modules/EE4L06/C02';
import { default as EE4L06C03 } from './modules/EE4L06/C03';

export const routers = [
  ...EE40L04C01,
  ...EE40L04C02,
  ...EE40L04C03,

  ...EE4L05C01,
  ...EE4L05C02,
  ...EE4L05C03,
  ...EE4L06C01,
  ...EE4L06C02,
  ...EE4L06C03,
];

export const rootRouter = [
  {
    path: 'EE4',
    children: routers,
  },
  ...demo,
];
