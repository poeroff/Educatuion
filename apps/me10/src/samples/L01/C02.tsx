// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRecoilState } from 'recoil';
import { pageAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import ME10101 from './ME-101-01';
import ME10201 from './ME-102-01';
import ME10301 from './ME-103-01';
import ME10401 from './ME-104-01';
import ME10501 from './ME-105-01';
import ME11101 from './ME-111-01';
import ME11201 from './ME-112-01';

export function C02() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <ME10101 />
      <ME10201 />
      <ME10301 />
      <ME10401 />
      <ME10501 />
      <ME11101 />
      <ME11201 />
    </Page>
  );
}

export default C02;
