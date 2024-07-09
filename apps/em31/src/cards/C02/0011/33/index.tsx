import { useRecoilState } from 'recoil';
import { pageAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';

export function C02001133() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
    </Page>
  );
}

export default C02001133;
