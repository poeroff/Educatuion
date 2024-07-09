import { useRecoilState } from 'recoil';
import { pageAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import HE01501 from './HE-015-01';
import HE01502 from './HE-015-02';

export function HE015() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <HE01501 />
      <HE01502 />
    </Page>
  );
}

export default HE015;
