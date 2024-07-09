import { Demo } from '@/components/Demo';

import { default as EE40L04C01 } from '@/router/modules/EE40L04/C01';
import { default as EE40L04C02 } from '@/router/modules/EE40L04/C02';
import { default as EE40L04C03 } from '@/router/modules/EE40L04/C03';
import { default as EE40L04C04 } from '@/router/modules/EE40L04/C04';

// demo/develop 안에 들어가는 파일들입니다.
const Demos: React.FC = () => {
  const paths = [...EE40L04C01, ...EE40L04C02, ...EE40L04C03, ...EE40L04C04];

  return <Demo paths={paths} />;
};

export default Demos;
