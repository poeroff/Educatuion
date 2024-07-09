import { useRecoilState } from 'recoil';
import { pageAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';

import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';

export function A04() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
      <P04 />
    </Page>
  );
}

export default A04;
