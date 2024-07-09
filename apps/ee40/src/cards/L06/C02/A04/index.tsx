import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P06 from './06';
import P07 from './07';
import P08 from './08';
import P05 from './05';

export function A04() {
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
    </Page>
  );
}

export default A04;
