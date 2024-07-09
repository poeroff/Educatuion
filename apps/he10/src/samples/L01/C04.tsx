import { useRecoilState } from 'recoil';
import { pageAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import HE00303 from './HE-003-03';
import HE00304 from './HE-003-04';
import HE00401 from './HE-004-01';
import HE00402 from './HE-004-02';
import HE00403 from './HE-004-03';
import HE00501 from './HE-005-01';
import HE00801 from './HE-008-01';
import HE00902 from './HE-009-02';
import HE01702 from './HE-017-02';

export function C04() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <HE00303 />
      <HE00304 />
      <HE00401 />
      <HE00402 />
      <HE00403 />
      <HE00501 />
      <HE00801 />
      <HE00902 />
      <HE01702 />
    </Page>
  );
}

export default C04;
