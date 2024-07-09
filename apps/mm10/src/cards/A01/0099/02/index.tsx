import { Page } from '@maidt-cntn/ui';

import P01 from './P01';
import P02 from './P02';
import P03 from './P03';
import P04 from './P04';
import P05 from './P05';
import P06 from './P06';
import P07 from './P07';
import P08 from './P08';
import P09 from './P09';
import P10 from './P10';
import P11 from './P11';
import P12 from './P12';
import P13 from './P13';
import usePageData from '@/hooks/usePageData';

export function C02() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
      <P04 />
      <P05 />
      <P06 />
      <P07 />
      <P08 />
      <P09 />
      <P10 />
      <P11 />
      <P12 />
      <P13 />
    </Page>
  );
}

export default C02;
