// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRecoilState } from 'recoil';
import { pageAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
//import HE00301 from './HE-003-01';

export function C02() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  return <Page selectedPage={selectedPage} setPage={setPage}></Page>;
}

export default C02;
