import { useRecoilState } from 'recoil';
import { pageAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';

export function A05000106() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
    </Page>
  );
}

export default A05000106;
