import { useRecoilState } from 'recoil';
import { Page } from '@maidt-cntn/ui';
import { pageAtom } from '@/stores/page';
import P01 from './01';
import P02 from './02';

export function A04() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
    </Page>
  );
}

export default A04;
